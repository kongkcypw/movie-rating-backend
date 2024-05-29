const router = require('express').Router();
const passport = require('passport');

const movieController = require('../controllers/movie.controller')

router.post(
    "/add-new", 
    passport.authenticate('jwt', { session: false }),
    movieController.add_new
);

router.post("/get-public", movieController.get_public);

router.get(
    "/get-all", 
    passport.authenticate('jwt', { session: false }),
    movieController.get_all
);

router.post(
    "/update", 
    passport.authenticate('jwt', { session: false }),
    movieController.update
);

router.post(
    "/delete", 
    passport.authenticate('jwt', { session: false }),
    movieController.delete
);

router.post(
    "/get-count-by-year", 
    passport.authenticate('jwt', { session: false }),
    movieController.getCountByYear
);

router.post(
    "/get-count-by-rating", 
    passport.authenticate('jwt', { session: false }),
    movieController.getCountByRating
);

router.post(
    "/get-over-view", 
    passport.authenticate('jwt', { session: false }),
    movieController.getOverview
);

module.exports = router;