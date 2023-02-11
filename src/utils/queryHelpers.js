const { Helpers } = require("./helpers");
const { query } = require("../database/connection");

class QueryHelpers {
    static isUserExist = async (userId) => {
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
}

module.exports = QueryHelpers;