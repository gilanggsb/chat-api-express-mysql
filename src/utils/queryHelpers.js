const { query } = require("../database/connection");

class QueryHelpers {
    static isUserExistByUserID = async (userId) => {
        try {
            const user = await query(`SELECT * FROM users WHERE uuid = '${userId}'`);
            if (user.length == 0) {
                return null;
            }
            return user[0];
        } catch (error) {
            throw error;
        }
    }
    static isUserExistByEmail = async (email) => {
        try {
            const user = await query(`SELECT * FROM users WHERE email = '${email}'`);
            if (user.length == 0) {
                return null;
            }
            return user[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = QueryHelpers;