// TEST VERSION
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


//  DEPLOY VERSION
const isProduction = process.env.NODE_ENV === 'production';
const cookieConfig = {
    options: {
        httpOnly: true,
        secure: isProduction, 
        maxAge: 60 * 60 * 1000, // 1 hour
        sameSite: 'None', // Allow cross-site cookies 
        credentials: 'include', // included in cross-site requests
    },
    refreshOptions: {
        httpOnly: false,
        secure: isProduction, 
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: 'None', // Allow cross-site cookies 
        credentials: 'include', // Ensure credentials
    },
};

module.exports = cookieConfig;
