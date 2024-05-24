// controllers/temaController.js
const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

// Inicializar la conexión a la base de datos
async function initialize() {
    await dbConfig.initialize();
}

initialize();

async function getTemas(req, res) {
    let connection;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute('SELECT * FROM tema');
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

async function crearTema(req, res) {
    let connection;
    try {
        const { nombre } = req.body;
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `INSERT INTO tema (nombre) VALUES (:nombre)`,
            [nombre],
            { autoCommit: true }  

        );
        res.status(201).json({ message: 'Tema creado correctamente' });
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

async function actualizarTema(req, res) {
    let connection;
    try {
        const id_tema = req.params.id_tema;
        const { nombre } = req.body;
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `UPDATE tema SET nombre = :nombre WHERE id_tema = :id_tema`,
            [nombre, id_tema],
            { autoCommit: true }  

        );
        res.json({ message: 'Tema actualizado correctamente' });
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

async function eliminarTema(req, res) {
    let connection;
    try {
        const id_tema = req.params.id_tema;
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `DELETE FROM tema WHERE id_tema = :id_tema`,
            [id_tema],
            { autoCommit: true }  

        );
        res.json({ message: 'Tema eliminado correctamente' });
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
    getTemas,
    crearTema,
    actualizarTema,
    eliminarTema
};
