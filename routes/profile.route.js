const router = require('express').Router();
const passport = require('passport');

const profileController = require('../controllers/profile.controller')

router.get(
    "/get-info", 
    passport.authenticate('jwt', { session: false }),
    profileController.get_info
);

module.exports = router;