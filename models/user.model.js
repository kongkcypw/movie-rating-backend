const { firebaseDB } = require("../config/firebase-config");
const { mysqlDB } = require("../config/mysql-config");

// exports.get_all_user = async () => {
//     try{
//         const snapshot = await firebaseDB.collection('users').get();
//         return snapshot;
//     } catch (error) {
//         throw error
//     }
// }

exports.get_all_user = async () => {
    try {
        const query =
        `SELECT
            *
        FROM 
            User`
        const [row] = await mysqlDB.query(query);
        console.log(row);
        return row;
    } catch (error) {
        console.log(error);
        throw error
    }
}

exports.findUser = async (username) => {
    try {
        const query =
        `SELECT
            *
        FROM 
            user
        WHERE
            username = '${username}' OR email = '${username}';`
        const [rows] = await mysqlDB.query(query);
        if (rows.length > 0) {
            return rows[0];  
        } else {
            return null;  
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

exports.insertUser = async (userId, username, email, password, role, permissionLevel) => {
    try {
        const query =
        `INSERT INTO 
            user (userId, username, email, password, role, permissionLevel) 
            VALUES ('${userId}', '${username}', '${email}', '${password}', '${role}', '${permissionLevel}')`
        const [rows] = await mysqlDB.query(query);
        if (rows.length > 0) {
            return rows[0];  // Return the first row
        } else {
            return null;  // No user found
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

exports.checkUsernameAlreadyExist = async (username) => {
    try {
        const query =
        `SELECT
            userId
        FROM 
            user
        WHERE
            username = '${username}';`
        const [rows] = await mysqlDB.query(query);
        if (rows.length > 0) {
            return rows[0];  // Return the first row
        } else {
            return null;  // No user found
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

exports.checkEmailAlreadyExist = async (email) => {
    try {
        const query =
        `SELECT
            userId
        FROM 
            user
        WHERE
            email = '${email}';`
        const [rows] = await mysqlDB.query(query);
        if (rows.length > 0) {
            return rows[0]; 
        } else {
            return null;  
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

exports.checkRepeatedUserId = async (userId) => {
    try {
        const query =
        `SELECT
            userId
        FROM 
            user
        WHERE
            userId = '${userId}';`
        const [rows] = await mysqlDB.query(query);
        return rows.length > 0;
    } catch (error) {
        console.log(error);
        throw error
    }
}

exports.getUserByUserId = async (userId) => {
    try {
        const query =
        `SELECT
            userId,
            username,
            email,
            role,
            permissionLevel
        FROM 
            user
        WHERE
        userId = '${userId}';`
        const [rows] = await mysqlDB.query(query);
        if (rows.length > 0) {
            return rows[0];  // Return the first row
        } else {
            return null;  // No user found
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}