const express = require('express');
const router = express.Router();

const authRoute = require("./auth.route");
const profileRoute = require("./profile.route");

router.use('/auth', authRoute)
router.use('/profile', profileRoute)

module.exports = router;