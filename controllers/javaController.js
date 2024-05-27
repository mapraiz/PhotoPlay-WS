const dbConfig = require('../config/dbConfig');
const oracledb = require('oracledb');


// Inicializar la conexión a la base de datos
async function initialize() {
    await dbConfig.initialize();
}

initialize();

// Inicializar la conexión a la base de datos
async function initialize() {
    await dbConfig.initialize();
}

initialize();

// Lógica del login
async function login(req, res) {
    const { username, contrasena } = req.body;

    let connection;

    try {
        // Obtener la conexión de la base de datos
        connection = await oracledb.getConnection(dbConfig);

        // Preparar los parámetros de salida
        const result = await connection.execute(
            `BEGIN
                comprobar_login(:p_username, :p_contrasena, :p_id_usuario, :p_admin, :p_mensaje);
            END;`,
            {
                p_username: username,
                p_contrasena: contrasena,
                p_id_usuario: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
                p_admin: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
                p_mensaje: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 255 }
            }
        );

        // Obtener los resultados del procedimiento almacenado
        const id_usuario = result.outBinds.p_id_usuario;
        const admin = result.outBinds.p_admin;
        const mensaje = result.outBinds.p_mensaje;

        // Comprobar el mensaje de salida
        if (mensaje === 'Login exitoso') {
            res.status(200).json({
                id_usuario: id_usuario,
                admin: admin,
                mensaje: mensaje
            });
        } else {
            res.status(401).json({
                mensaje: mensaje
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
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

// Agregar la función de login a los exports
exports.login = login;

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

