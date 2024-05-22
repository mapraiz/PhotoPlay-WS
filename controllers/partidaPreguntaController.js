// controllers/partidaPreguntaController.js
const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

// Inicializar la conexión a la base de datos
async function initialize() {
    await dbConfig.initialize();
}

initialize();

async function getPartidasPreguntas(req, res) {
    let connection;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute('SELECT * FROM partida_pregunta');
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

async function crearPartidaPregunta(req, res) {
    let connection;
    try {
        const { id_partida, id_pregunta } = req.body;
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `INSERT INTO partida_pregunta (id_partida, id_pregunta) VALUES (:id_partida, :id_pregunta)`,
            [id_partida, id_pregunta]
        );
        res.status(201).json({ message: 'Relación partida-pregunta creada correctamente' });
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

async function actualizarPartidaPregunta(req, res) {
    let connection;
    try {
        const id_partida_pregunta = req.params.id_partida_pregunta;
        const { id_partida, id_pregunta } = req.body;
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `UPDATE partida_pregunta SET id_partida = :id_partida, id_pregunta = :id_pregunta WHERE id_partida_pregunta = :id_partida_pregunta`,
            [id_partida, id_pregunta, id_partida_pregunta]
        );
        res.json({ message: 'Relación partida-pregunta actualizada correctamente' });
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

async function eliminarPartidaPregunta(req, res) {
    let connection;
    try {
        const id_partida_pregunta = req.params.id_partida_pregunta;
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `DELETE FROM partida_pregunta WHERE id_partida_pregunta = :id_partida_pregunta`,
            [id_partida_pregunta]
        );
        res.json({ message: 'Relación partida-pregunta eliminada correctamente' });
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
    getPartidasPreguntas,
    crearPartidaPregunta,
    actualizarPartidaPregunta,
    eliminarPartidaPregunta
};
