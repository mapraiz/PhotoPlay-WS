// src/controllers/respuestaController.ts
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Respuesta } from "../entity/Respuesta";

export const createRespuesta = async (req: Request, res: Response) => {
  const { texto, correcta, id_pregunta } = req.body;
  try {
    const respuestaRepository = getRepository(Respuesta);
    const respuesta = new Respuesta();
    respuesta.texto = texto;
    respuesta.correcta = correcta;
    respuesta.pregunta = id_pregunta;
    await respuestaRepository.save(respuesta);
    res.status(201).json(respuesta);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la respuesta", error: error.message });
  }
};

export const updateRespuesta = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { texto, correcta, id_pregunta } = req.body;
  try {
    const respuestaRepository = getRepository(Respuesta);
    const respuesta = await respuestaRepository.findOne(id);
    if (!respuesta) {
      return res.status(404).json({ message: "Respuesta no encontrada" });
    }
    respuesta.texto = texto;
    respuesta.correcta = correcta;
    respuesta.pregunta = id_pregunta;
    await respuestaRepository.save(respuesta);
    res.json(respuesta);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la respuesta", error: error.message });
  }
};

export const deleteRespuesta = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const respuestaRepository = getRepository(Respuesta);
    const respuesta = await respuestaRepository.findOne(id);
    if (!respuesta) {
      return res.status(404).json({ message: "Respuesta no encontrada" });
    }
    await respuestaRepository.remove(respuesta);
    res.json({ message: "Respuesta eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la respuesta", error: error.message });
  }
};
