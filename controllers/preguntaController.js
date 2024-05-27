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

module.exports = {
    getPreguntas,
    crearPregunta,
    actualizarPregunta,
    eliminarPregunta


};
