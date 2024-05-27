// controllers/respuestaController.js
const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

// Inicializar la conexión a la base de datos
async function initialize() {
    await dbConfig.initialize();
}

initialize();

async function getRespuestas(req, res) {
    let connection;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute('SELECT * FROM respuesta');
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

async function crearRespuesta(req, res) {
    let connection;
    try {
        const { correcta, texto, id_pregunta } = req.body;
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `INSERT INTO respuesta (correcta, texto, id_pregunta) VALUES (:correcta, :texto, :id_pregunta)`,
            [correcta, texto, id_pregunta],
            { autoCommit: true }
        );
        res.status(201).json({ message: 'Respuesta creada correctamente' });
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

async function actualizarRespuesta(req, res) {
    let connection;
    try {
        const id_respuesta = req.params.id_respuesta;
        const { correcta, texto, id_pregunta } = req.body;
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `UPDATE respuesta SET correcta = :correcta, texto = :texto, id_pregunta = :id_pregunta WHERE id_respuesta = :id_respuesta`,
            [correcta, texto, id_pregunta, id_respuesta],
            { autoCommit: true }
        );
        res.json({ message: 'Respuesta actualizada correctamente' });
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

async function eliminarRespuesta(req, res) {
    let connection;
    try {
        const id_respuesta = req.params.id_respuesta;
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `DELETE FROM respuesta WHERE id_respuesta = :id_respuesta`,
            [id_respuesta],
            { autoCommit: true }  

        );
        res.json({ message: 'Respuesta eliminada correctamente' });
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
    getRespuestas,
    crearRespuesta,
    actualizarRespuesta,
    eliminarRespuesta
};
