// config/dbConfig.js
const oracledb = require('oracledb');

async function initialize() {
    await oracledb.createPool({
        user: 'c##photoplay',
        password: 'almi123',
        connectString: '3.221.255.12:1521/ORCLCDB'
    });
}

module.exports.initialize = initialize;
