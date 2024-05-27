// config/dbConfig.js
const oracledb = require('oracledb');

let pool;

async function initialize() {
    await oracledb.createPool({
        user: 'c##photoplay',
        password: 'almi123',
        connectString: '3.221.255.12:1521/ORCLCDB'
    });
}
async function close() {
    await oracledb.getPool().close();
}

function getPool() {
    return pool;
}


module.exports.initialize = initialize;
module.exports.close = close;
module.exports.getPool = getPool;