"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePregunta = exports.updatePregunta = exports.createPregunta = exports.getPreguntaById = exports.getAllPreguntas = void 0;
const typeorm_1 = require("typeorm");
const Pregunta_1 = require("../entity/Pregunta");
const getAllPreguntas = async (req, res) => {
    try {
        const preguntaRepository = (0, typeorm_1.getRepository)(Pregunta_1.Pregunta);
        const preguntas = await preguntaRepository.find({ relations: ["respuestas", "tema"] });
        res.json(preguntas);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener las preguntas", error: error.message });
    }
};
exports.getAllPreguntas = getAllPreguntas;
const getPreguntaById = async (req, res) => {
    const id = req.params.id;
    try {
        const preguntaRepository = (0, typeorm_1.getRepository)(Pregunta_1.Pregunta);
        const pregunta = await preguntaRepository.findOne(id, { relations: ["respuestas", "tema"] });
        if (!pregunta) {
            return res.status(404).json({ message: "Pregunta no encontrada" });
        }
        res.json(pregunta);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener la pregunta", error: error.message });
    }
};
exports.getPreguntaById = getPreguntaById;
const createPregunta = async (req, res) => {
    const { img, texto, id_tema } = req.body;
    try {
        const preguntaRepository = (0, typeorm_1.getRepository)(Pregunta_1.Pregunta);
        const pregunta = new Pregunta_1.Pregunta();
        pregunta.img = img;
        pregunta.texto = texto;
        pregunta.tema = id_tema;
        await preguntaRepository.save(pregunta);
        res.status(201).json(pregunta);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear la pregunta", error: error.message });
    }
};
exports.createPregunta = createPregunta;
const updatePregunta = async (req, res) => {
    const id = req.params.id;
    const { img, texto, id_tema } = req.body;
    try {
        const preguntaRepository = (0, typeorm_1.getRepository)(Pregunta_1.Pregunta);
        const pregunta = await preguntaRepository.findOne(id);
        if (!pregunta) {
            return res.status(404).json({ message: "Pregunta no encontrada" });
        }
        pregunta.img = img;
        pregunta.texto = texto;
        pregunta.tema = id_tema;
        await preguntaRepository.save(pregunta);
        res.json(pregunta);
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar la pregunta", error: error.message });
    }
};
exports.updatePregunta = updatePregunta;
const deletePregunta = async (req, res) => {
    const id = req.params.id;
    try {
        const preguntaRepository = (0, typeorm_1.getRepository)(Pregunta_1.Pregunta);
        const pregunta = await preguntaRepository.findOne(id);
        if (!pregunta) {
            return res.status(404).json({ message: "Pregunta no encontrada" });
        }
        await preguntaRepository.remove(pregunta);
        res.json({ message: "Pregunta eliminada correctamente" });
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar la pregunta", error: error.message });
    }
};
exports.deletePregunta = deletePregunta;
//# sourceMappingURL=preguntaController.js.map