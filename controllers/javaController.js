const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

// Inicializar la conexión a la base de datos
async function initialize() {
    await dbConfig.initialize();
}

initialize();

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




// Obtener respuesta correcta
async function obtenerRespuestaCorrecta (req, res) {
    const { pregunta } = req.query;

    try {
        // Lógica para obtener la respuesta correcta de una pregunta
        const respuestaCorrecta = await PreguntaService.obtenerRespuestaCorrecta(pregunta);

        res.status(200).json({ respuesta: respuestaCorrecta });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno");
    }
};

// Obtener pregunta aleatoria
async function obtenerPreguntaAleatoria (req, res) {
    const { tema } = req.query;

    try {
        // Lógica para obtener una pregunta aleatoria según el tema
        const preguntaAleatoria = await PreguntaService.obtenerPreguntaAleatoria(tema);

        res.status(200).json({ pregunta: preguntaAleatoria });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno");
    }
};

// Obtener respuestas aleatorias
async function obtenerRespuestasAleatorias (req, res) {
    const { pregunta } = req.query;

    try {
        // Lógica para obtener respuestas aleatorias de una pregunta
        const respuestasAleatorias = await PreguntaService.obtenerRespuestasAleatorias(pregunta);

        res.status(200).json(respuestasAleatorias);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno");
    }
};

module.exports = {
    comprobarUsuario
    
};
