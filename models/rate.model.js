const { mysqlDB } = require("../config/mysql-config");

exports.getAllRateId = async () => {
    try {
        const query =
        `SELECT
            *
        FROM 
            rate;`
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