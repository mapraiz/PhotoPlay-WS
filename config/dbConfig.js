// config/dbConfig.js
const oracledb = require('oracledb');

async function initialize() {
    await oracledb.createPool({
        user: 'photoplay',
        password: 'almi123',
        connectString: '100.28.90.231:1521/ORCLCDB'
    });
}

module.exports.initialize = initialize;
