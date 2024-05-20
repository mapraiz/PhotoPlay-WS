"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRespuesta = exports.updateRespuesta = exports.createRespuesta = void 0;
const typeorm_1 = require("typeorm");
const Respuesta_1 = require("../entity/Respuesta");
const createRespuesta = async (req, res) => {
    const { texto, correcta, id_pregunta } = req.body;
    try {
        const respuestaRepository = (0, typeorm_1.getRepository)(Respuesta_1.Respuesta);
        const respuesta = new Respuesta_1.Respuesta();
        respuesta.texto = texto;
        respuesta.correcta = correcta;
        respuesta.pregunta = id_pregunta;
        await respuestaRepository.save(respuesta);
        res.status(201).json(respuesta);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear la respuesta", error: error.message });
    }
};
exports.createRespuesta = createRespuesta;
const updateRespuesta = async (req, res) => {
    const id = req.params.id;
    const { texto, correcta, id_pregunta } = req.body;
    try {
        const respuestaRepository = (0, typeorm_1.getRepository)(Respuesta_1.Respuesta);
        const respuesta = await respuestaRepository.findOne(id);
        if (!respuesta) {
            return res.status(404).json({ message: "Respuesta no encontrada" });
        }
        respuesta.texto = texto;
        respuesta.correcta = correcta;
        respuesta.pregunta = id_pregunta;
        await respuestaRepository.save(respuesta);
        res.json(respuesta);
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar la respuesta", error: error.message });
    }
};
exports.updateRespuesta = updateRespuesta;
const deleteRespuesta = async (req, res) => {
    const id = req.params.id;
    try {
        const respuestaRepository = (0, typeorm_1.getRepository)(Respuesta_1.Respuesta);
        const respuesta = await respuestaRepository.findOne(id);
        if (!respuesta) {
            return res.status(404).json({ message: "Respuesta no encontrada" });
        }
        await respuestaRepository.remove(respuesta);
        res.json({ message: "Respuesta eliminada correctamente" });
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar la respuesta", error: error.message });
    }
};
exports.deleteRespuesta = deleteRespuesta;
//# sourceMappingURL=respuestaController.js.map