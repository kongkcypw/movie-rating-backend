const isProduction = process.env.NODE_ENV === 'production';

const cookieConfig = {
    options: {
        httpOnly: true,
        secure: isProduction,
        maxAge: 60 * 60 * 1000, // 1 hour
        Credentials: true,
    },
    refreshOptions: {
        httpOnly: false,
        secure: isProduction,
        maxAge: 24 * 60 * 60 * 1000, // 24 hour
        Credentials: true,
    },
};

module.exports = cookieConfig;