// const cookieConfig = {
//     options: {
//         httpOnly: true,
//         secure: false,
//         maxAge: 60 * 60 * 1000, // 1 hour
//         Credentials: true,
//     },
//     refreshOptions: {
//         httpOnly: false,
//         secure: false,
//         maxAge: 24 * 60 * 60 * 1000, // 24 hour
//         Credentials: true,
//     },
// };

// module.exports = cookieConfig;

const isProduction = process.env.NODE_ENV === 'production';

const cookieConfig = {
    options: {
        httpOnly: true,
        secure: isProduction, // Set to true in production
        maxAge: 60 * 60 * 1000, // 1 hour
        sameSite: 'None', // Allow cross-site cookies (set to 'Lax' or 'Strict' as needed)
        credentials: 'include', // Ensure credentials are included in cross-site requests
    },
    refreshOptions: {
        httpOnly: false,
        secure: isProduction, // Set to true in production
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: 'None', // Allow cross-site cookies (set to 'Lax' or 'Strict' as needed)
        credentials: 'include', // Ensure credentials are included in cross-site requests
    },
};

module.exports = cookieConfig;
