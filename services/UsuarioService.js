const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

// Inicializar la conexión a la base de datos
async function initialize() {
    await dbConfig.initialize();
}

initialize();

async function comprobarUsuario(username, contrasena) {
    let connection;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `SELECT COUNT(*) AS count FROM usuario WHERE username = :username AND contrasena = :contrasena`,
            { username, contrasena }
        );

        // El usuario es válido si se encuentra en la base de datos
        return result.rows[0].count > 0;
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

module.exports = {
    comprobarUsuario
};
