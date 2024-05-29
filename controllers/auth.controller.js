require("dotenv").config()
const jwt = require("jsonwebtoken")
const opts = require('../config/cookie-config');
const bcrypt = require('bcrypt');
const { uuidv7 } = require('uuidv7');
const { findUser, checkUsernameAlreadyExist, checkEmailAlreadyExist, insertUser, checkRepeatedUserId, getUserByUserId } = require("../models/user.model");

const createTokens = (user) => {
    const accessToken = jwt.sign(
        { userId: user.userId, role: user.role, permissionLevel: user.permissionLevel },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
        }
    );
    const refreshToken = jwt.sign(
        { userId: user.userId, role: user.role, permissionLevel: user.permissionLevel },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_REFRESH_EXPIRATION,
        }
    );
    return { accessToken, refreshToken };
};

const generateUniqueUserId = async () => {
    let unique = false;
    let userId;
    while (!unique) {
        userId = 'u' + uuidv7().slice(0, 12);
        unique = !(await checkRepeatedUserId(userId));
    }
    return userId;
};

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body

        if ((!username && !password) || (!username && password) || (username && !password)) {
            return res.status(400).json({ message: "all input is require" })
        }

        const user = await findUser(username);

        if (!user || user.length === 0) {
            return res.status(401).json({ message: "You don't have account yet, please sign up" })
        }

        if (user) {
            const isMatch = await new Promise((resolve, reject) => {
                bcrypt.compare(
                    password,
                    user.password,
                    function (err, result) {
                        if (err) reject(err);
                        resolve(result);
                    }
                );
            });
    
            if (!isMatch) {
                return res.status(400).json({ message: 'Incorrect email or password.'});
            }

            const { accessToken, refreshToken } = createTokens(user);

            res.cookie('accessToken', accessToken, opts.options);
            res.cookie('refreshToken', refreshToken, opts.refreshOptions);
            return res.status(200).json({
                userId: user.userId,
                email: user.email,
                firstName: user.firstName,
                role: user.role,
                permissionLevel: user.permissionLevel
            }).send();
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error occurred during login.',
        });
    }
}

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "all input is require" });
        }

        const usernameAlreadyExist = await checkUsernameAlreadyExist(username);
        const emailAlreadyExist = await checkEmailAlreadyExist(email);

        if (usernameAlreadyExist) {
            return res.status(409).json({ conflict: "username", message: 'Username already exists.' });
        }
        if (emailAlreadyExist) {
            return res.status(409).json({ conflict: "email", message: 'Email already exists.' });
        }

        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, function (err, hash) {
                if (err) reject(err);
                resolve(hash);
            });
        });

        const userId = await generateUniqueUserId();
        const role = "USER";
        const permissionLevel = 0;

        await insertUser(userId, username, email, hashedPassword, role, permissionLevel);
        console.log('User: %s Email: %s signed up successfully.', userId, email);

        const { accessToken, refreshToken } = createTokens({ userId: userId }, role);

        res.cookie('accessToken', accessToken, opts.options);
        res.cookie('refreshToken', refreshToken, opts.refreshOptions);
        res.status(200)
            .json({
                user: userId,
                email: email,
                username: username,
                role: role,
                permissionLevel: permissionLevel
            })
            .send();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error occurred during signup.',
        });
    }
};

exports.jwtRefreshTokenValidate = (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            console.log('No refresh token provided');
            return res.sendStatus(400);
        }
        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_TOKEN_SECRET
        );
        req.user = decoded;
        next();
    } catch (error) {
        console.log('Error verifying refresh token:', error);
        return res.sendStatus(403);
    }
};

exports.refresh = async (req, res) => {
    try {
        const user = await getUserByUserId(req.user.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { accessToken, refreshToken } = createTokens(user);

        console.log('User: %s has refresh access token.', user.email);
        res.cookie('accessToken', accessToken, opts.options);
        res.cookie('refreshToken', refreshToken, opts.refreshOptions);
        return res
            .status(200)
            .json({
                message: 'Token refresh successful.',
            })
            .send();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.logout = (req, res) => {
    try{
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            domain: 'movie-rating-backend.vercel.app',
            path: '/',
        });
        res.clearCookie('refreshToken', {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            domain: 'movie-rating-backend.vercel.app',
            path: '/',
        });
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch(error) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
