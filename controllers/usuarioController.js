// controllers/usuarioController.js
const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');
const UsuarioService = require('../services/UsuarioService');

// Inicializar la conexión a la base de datos
async function initialize() {
    await dbConfig.initialize();
}

initialize();

async function getUsuarios(req, res) {
    let connection;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute('SELECT * FROM usuario');
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

async function crearUsuario(req, res) {
    let connection;
    try {
        const { username, contrasena, admin } = req.body;
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `INSERT INTO usuario (username, contrasena, admin) VALUES (:username, :contrasena, :admin)`,
            [username, contrasena, admin],
            { autoCommit: true }  
        );
        res.status(201).json({ message: 'Usuario creado correctamente' });
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

async function actualizarUsuario(req, res) {
    let connection;
    try {
        const id_usuario = req.params.id_usuario;
        const { username, contrasena, admin } = req.body;
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `UPDATE usuario SET username = :username, contrasena = :contrasena, admin = :admin WHERE id_usuario = :id_usuario`,
            [username, contrasena, admin, id_usuario],
            { autoCommit: true } 
        );
        res.json({ message: 'Usuario actualizado correctamente' });
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

async function eliminarUsuario(req, res) {
    let connection;
    try {
        const id_usuario = req.params.id_usuario;
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `DELETE FROM usuario WHERE id_usuario = :id_usuario`,
            [id_usuario],
            { autoCommit: true }  
        );
        res.json({ message: 'Usuario eliminado correctamente' });
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
async function comprobarUsuario (req, res) {
    const { username, contrasena } = req.query;

    try {
        const usuarioValido = await UsuarioService.comprobarUsuario(username, contrasena);

        if (usuarioValido) {
            res.status(200).send("Usuario válido");
        } else {
            res.status(401).send("Usuario inválido");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno");
    }
};

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    comprobarUsuario
};
