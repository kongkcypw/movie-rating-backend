const router = require('express').Router();
const passport = require('passport');

const movieController = require('../controllers/movie.controller')

router.post(
    "/add-new", 
    passport.authenticate('jwt', { session: false }),
    movieController.add_new
);

router.get(
    "/get-all", 
    passport.authenticate('jwt', { session: false }),
    movieController.get_all
);

module.exports = router;