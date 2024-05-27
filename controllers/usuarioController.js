const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

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
async function validarUsuario(username, contrasena) {
    let connection;
    let isValid = false;
    try {
        connection = await oracledb.getConnection();
        const bindVars = {
            p_username: { dir: oracledb.BIND_IN, val: username },
            p_password: { dir: oracledb.BIND_IN, val: contrasena },
            p_valid: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
        };
        const result = await connection.execute(
            `BEGIN
                 VALIDAR_USUARIO(:p_username, :p_password, :p_valid);
             END;`,
            bindVars,
            { autoCommit: true }
        );

        isValid = result.outBinds.p_valid === 1;
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
    return isValid;
}

async function comprobarUsuario(req, res) {
    const { username, contrasena } = req.query;

    try {
        const usuarioValido = await validarUsuario(username, contrasena);

        if (usuarioValido) {
            res.status(200).send("Usuario válido");
        } else {
            res.status(401).send("Usuario inválido");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno");
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    comprobarUsuario
};
