const express = require('express');
const router = express.Router();

const authRoute = require("./auth.route");
const profileRoute = require("./profile.route");
const movieRoute = require("./movie.route");

router.use('/auth', authRoute)
router.use('/profile', profileRoute)
router.use('/movie', movieRoute)

module.exports = router;