const { mysqlDB } = require("../config/mysql-config")

exports.insertMovie = async (movieId, movieTitle, yearReleased, rating, movieImageUrl) => {
    try {
        const query = `
            INSERT INTO movie (movieId, movieTitle, yearReleased, rating, movieImageUrl) 
            VALUES (?, ?, ?, ?, ?)`;
        const result = await mysqlDB.query(query, [movieId, movieTitle, yearReleased, rating, movieImageUrl]);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.checkRepeatedMovieId = async (movieId) => {
    try {
        const query =
        `SELECT
            movieId
        FROM 
            movie
        WHERE
        movieId = ?;`
        const [rows] = await mysqlDB.query(query, [movieId]);
        return rows.length > 0;
    } catch (error) {
        console.log(error);
        throw error
    }
}

exports.getAllMovie = async () => {
    try {
        const query =
        `SELECT
            *
        FROM 
            movie
        ORDER BY
            yearReleased DESC;`
        const [rows] = await mysqlDB.query(query);
        if (rows.length > 0) {
            return rows;  
        } else {
            return null; 
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

// Not select MovieId
exports.getPublicMoviesByYearRange = async (startYear, endYear) => {
    try {
        const query = `
            SELECT
                movieTitle,
                yearReleased,
                rating,
                movieImageUrl
            FROM 
                movie
            WHERE
                yearReleased BETWEEN ? AND ?
            ORDER BY
                yearReleased DESC`;
        const [rows] = await mysqlDB.query(query, [startYear, endYear]);
        return rows;
    } catch (error) {
        console.error('Error fetching movies by year range:', error);
        throw error;
    }
}


exports.updateMovie = async (movieId, movieTitle, yearReleased, rating, movieImageUrl) => {
    try {
        const query = `
            UPDATE 
                movie 
            SET 
                movieTitle = ?, 
                yearReleased = ?, 
                rating = ?, 
                movieImageUrl = ?
            WHERE movieId = ?`;
        const result = await mysqlDB.query(query, [movieTitle, yearReleased, rating, movieImageUrl, movieId]);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.deleteMovie = async (movieId) => {
    try {
        const query = `
            DELETE FROM 
                movie 
            WHERE 
                movieId = ?`;
        const result = await mysqlDB.query(query, [movieId]);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}