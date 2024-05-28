require('dotenv').config();

const mysql = require('mysql2/promise');

const sql_connection_config = {
    host     : process.env.DB_HOST,
    port     : process.env.DB_PORT,
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    multipleStatements: false,
    waitForConnections: true,
    connectionLimit: 10,
}

const mysqlDB = mysql.createPool(sql_connection_config);

module.exports = { mysqlDB };