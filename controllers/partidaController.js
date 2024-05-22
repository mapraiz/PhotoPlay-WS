// controllers/partidaController.js
const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

// Inicializar la conexión a la base de datos
async function initialize() {
    await dbConfig.initialize();
}

initialize();

async function getPartidas(req, res) {
    let connection;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute('SELECT * FROM partida');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
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

async function crearPartida(req, res) {
    let connection;
    try {
        const { fecha, puntuacion, id_usuario } = req.body;
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `INSERT INTO partida (fecha, puntuacion, id_usuario) VALUES (TO_TIMESTAMP(:fecha, 'YYYY-MM-DD"T"HH24:MI:SS.FF3'), :puntuacion, :id_usuario)`,
            [fecha, puntuacion, id_usuario]
        );
        res.status(201).json({ message: 'Partida creada correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
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

async function actualizarPartida(req, res) {
    let connection;
    try {
        const id_partida = req.params.id_partida;
        const { fecha, puntuacion, id_usuario } = req.body;
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `UPDATE partida SET fecha = TO_TIMESTAMP(:fecha, 'YYYY-MM-DD"T"HH24:MI:SS.FF3'), puntuacion = :puntuacion, id_usuario = :id_usuario WHERE id_partida = :id_partida`,
            [fecha, puntuacion, id_usuario, id_partida]
        );
        res.json({ message: 'Partida actualizada correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
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

async function eliminarPartida(req, res) {
    let connection;
    try {
        const id_partida = req.params.id_partida;
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `DELETE FROM partida WHERE id_partida = :id_partida`,
            [id_partida]
        );
        res.json({ message: 'Partida eliminada correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
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
    getPartidas,
    crearPartida,
    actualizarPartida,
    eliminarPartida
};
