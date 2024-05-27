const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

// Inicializar la conexión a la base de datos
async function initialize() {
    await dbConfig.initialize();
}

initialize();
exports.validarUsuario = async (username, contrasena) => {
    let connection;
    let isValid = false;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `SELECT COUNT(*) as count FROM usuario WHERE username = :username AND contrasena = :contrasena`,
            { username, contrasena },
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        isValid = result.rows[0].COUNT > 0;
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

exports.comprobarUsuario = async (req, res) => {
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
exports.obtenerRespuestaCorrecta = async (req, res) => {
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
exports.obtenerPreguntaAleatoria = async (req, res) => {
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
exports.obtenerRespuestasAleatorias = async (req, res) => {
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
exports.obtenerPreguntaYRespuestas = async (req, res) => {
    const { tema } = req.query;

    try {
        // Lógica para obtener pregunta y respuestas según el tema
        const preguntaYRespuestas = await PreguntaService.obtenerPreguntaYRespuestas(tema);

        res.status(200).json(preguntaYRespuestas);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno");
    }
};

