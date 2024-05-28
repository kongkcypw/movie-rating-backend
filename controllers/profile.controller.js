const { getUserByUserId } = require("../models/user.model");

exports.get_info = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await getUserByUserId(userId)
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while getting user profile',
        });
    }
};
