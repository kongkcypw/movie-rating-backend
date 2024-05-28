const { mysqlDB } = require("../config/mysql-config")

exports.insertMovie = async (movieId, movieTitle, yearReleased, rating, movieImageUrl) => {
    try {
        const query =
            `INSERT INTO 
            movie (movieId, movieTitle, yearReleased, rating, movieImageUrl) 
            VALUES ('${movieId}', '${movieTitle}', '${yearReleased}', '${rating}', '${movieImageUrl}')`
        const result = await mysqlDB.query(query);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        throw error
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
        movieId = '${movieId}';`
        const [rows] = await mysqlDB.query(query);
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
            movie;`
        const [rows] = await mysqlDB.query(query);
        console.log(rows);
        if (rows.length > 0) {
            return rows;  // Return the first row
        } else {
            return null;  // No user found
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}