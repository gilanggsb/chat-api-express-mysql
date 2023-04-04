const mysql = require('mysql');
const { Helpers } = require('../utils/helpers');
const { config } = require('./config')
let connection = null;

const createConnection = (config) => {
    if (!connection) {
        connection = mysql.createConnection({
            ...config,
            ssl: true
        });
    }
    return connection;
};


const query = (sql, params) => {
    return new Promise(async (resolve, reject) => {
        createConnection(config);
        Helpers.print('QUERY : \n', sql);
        await connection.query(sql, params, (error, result) => {
            if (error) return reject(error);
            Helpers.print(`QUERY RESULT : \n`, result);
            return resolve(result);
        });
    });
};

module.exports = {
    query
};
