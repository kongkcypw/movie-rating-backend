const JwtStrategy = require('passport-jwt').Strategy;
require('dotenv').config();

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(
            {
                jwtFromRequest: (req) => req.cookies.accessToken,
                secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
            },
            (jwtPayload, done) => {
                console.log(jwtPayload);
                if (Date.now() > jwtPayload.expires) {
                    return done('jwt expired');
                }
                const user = {
                    userId: jwtPayload.userId,
                    role: jwtPayload.role,
                    permissionLevel: jwtPayload.permissionLevel
                };
                return done(null, user);
            }
        )
    );
};