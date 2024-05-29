const { insertMovie, checkRepeatedMovieId, getAllMovie, updateMovie, deleteMovie, getPublicMoviesByYearRange, checkRepeatedMovieTitle } = require("../models/movie.model");
const { uuidv7 } = require('uuidv7');
const { getAllRateId } = require("../models/rate.model");

const generateUniqueMovieId = async () => {
    let unique = false;
    let movieId;
    while (!unique) {
        movieId = uuidv7();
        unique = !(await checkRepeatedMovieId(movieId));
    }
    return movieId;
};

exports.get_public = async (req, res) => {
    try {
        const { startYear, endYear } = req.body;
        const movie = await getPublicMoviesByYearRange(startYear, endYear);
        res.status(200).json({ message: "get all movie success", movie: movie });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while get movie list',
        });
    }
}


exports.get_all = async (req, res) => {
    try {
        const permissionLevel = req.user.permissionLevel;
        console.log(`permissionLevel ${permissionLevel}`);

        if (permissionLevel < 1) {
            return res.status(423).json({ message: "you don't have permission to get all field of movieId" });
        }

        const movie = await getAllMovie();
        const rate = await getAllRateId();

        res.status(200).json({ message: "get all movie success", movie: movie, rate: rate });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while get movie list',
        });
    }
};

exports.add_new = async (req, res) => {
    try {
        const permissionLevel = req.user.permissionLevel;
        console.log(`permissionLevel ${permissionLevel}`);

        if (permissionLevel < 1) {
            return res.status(423).json({ message: "you don't have permission to add movie" });
        }

        const { movieTitle, yearReleased, rating, movieImageUrl } = req.body;

        if (!movieTitle || !yearReleased || !rating || !movieImageUrl) {
            return res.status(400).json({ message: "All input is require" });
        }

        const movieAlreadyExist = await checkRepeatedMovieTitle(movieTitle);

        if (movieAlreadyExist) {
            return res.status(409).json({ message: "This movie already exist" })
        }

        const movieId = await generateUniqueMovieId();
        const result = await insertMovie(movieId, movieTitle, yearReleased, rating, movieImageUrl)

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while add new movie',
        });
    }
};

exports.update = async (req, res) => {
    try {
        const { movieId, movieTitle, rating, movieImageUrl, yearReleased } = req.body;
        const permissionLevel = req.user.permissionLevel;

        if (permissionLevel < 1) {
            return res.status(423).json({ message: "you don't have permission to update movie" });
        }

        if (!movieTitle || !yearReleased || !rating || !movieImageUrl) {
            return res.status(400).json({ message: "All input is require" });
        }

        const result = await updateMovie(movieId, movieTitle, yearReleased, rating, movieImageUrl);

        res.status(200).json({ message: "update movie success", result: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while update movie',
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const { movieId } = req.body;
        const permissionLevel = req.user.permissionLevel;
        console.log(`permissionLevel ${permissionLevel}`);

        if (permissionLevel < 1) {
            return res.status(423).json({ message: "you don't have permission to delete movie" });
        }
        const result = await deleteMovie(movieId);

        res.status(200).json({ message: "delete movie success", result: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while update movie',
        });
    }
};