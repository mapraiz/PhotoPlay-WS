// controllers/preguntaController.js
const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

// Inicializar la conexión a la base de datos
async function initialize() {
    await dbConfig.initialize();
}

initialize();

async function getPreguntas(req, res) {
    let connection;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute('SELECT * FROM pregunta');
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

async function crearPregunta(req, res) {
    let connection;
    try {
        const { img, texto, id_tema } = req.body;
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `INSERT INTO pregunta (img, texto, id_tema) VALUES (:img, :texto, :id_tema)`,
            [img, texto, id_tema],
            { autoCommit: true }  
        );
        res.status(201).json({ message: 'Pregunta creada correctamente' });
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

async function actualizarPregunta(req, res) {
    let connection;
    try {
        const id_pregunta = req.params.id_pregunta;
        const { img, texto, id_tema } = req.body;
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `UPDATE pregunta SET img = :img, texto = :texto, id_tema = :id_tema WHERE id_pregunta = :id_pregunta`,
            [img, texto, id_tema, id_pregunta],
            { autoCommit: true }  
        );
        res.json({ message: 'Pregunta actualizada correctamente' });
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

async function eliminarPregunta(req, res) {
    let connection;
    try {
        const id_pregunta = req.params.id_pregunta;
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `DELETE FROM pregunta WHERE id_pregunta = :id_pregunta`,
            [id_pregunta],
            { autoCommit: true }  

        );
        res.json({ message: 'Pregunta eliminada correctamente' });
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
    getPreguntas,
    crearPregunta,
    actualizarPregunta,
    eliminarPregunta,
};
