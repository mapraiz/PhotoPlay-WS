// src/controllers/preguntaController.ts
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Pregunta } from "../entity/Pregunta";
import { Respuesta } from "../entity/Respuesta";

export const getAllPreguntas = async (req: Request, res: Response) => {
  try {
    const preguntaRepository = getRepository(Pregunta);
    const preguntas = await preguntaRepository.find({ relations: ["respuestas", "tema"] });
    res.json(preguntas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las preguntas", error: error.message });
  }
};

export const getPreguntaById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const preguntaRepository = getRepository(Pregunta);
    const pregunta = await preguntaRepository.findOne(id, { relations: ["respuestas", "tema"] });
    if (!pregunta) {
      return res.status(404).json({ message: "Pregunta no encontrada" });
    }
    res.json(pregunta);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la pregunta", error: error.message });
  }
};

export const createPregunta = async (req: Request, res: Response) => {
  const { img, texto, id_tema } = req.body;
  try {
    const preguntaRepository = getRepository(Pregunta);
    const pregunta = new Pregunta();
    pregunta.img = img;
    pregunta.texto = texto;
    pregunta.tema = id_tema;
    await preguntaRepository.save(pregunta);
    res.status(201).json(pregunta);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la pregunta", error: error.message });
  }
};

export const updatePregunta = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { img, texto, id_tema } = req.body;
  try {
    const preguntaRepository = getRepository(Pregunta);
    const pregunta = await preguntaRepository.findOne(id);
    if (!pregunta) {
      return res.status(404).json({ message: "Pregunta no encontrada" });
    }
    pregunta.img = img;
    pregunta.texto = texto;
    pregunta.tema = id_tema;
    await preguntaRepository.save(pregunta);
    res.json(pregunta);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la pregunta", error: error.message });
  }
};

export const deletePregunta = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const preguntaRepository = getRepository(Pregunta);
    const pregunta = await preguntaRepository.findOne(id);
    if (!pregunta) {
      return res.status(404).json({ message: "Pregunta no encontrada" });
    }
    await preguntaRepository.remove(pregunta);
    res.json({ message: "Pregunta eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la pregunta", error: error.message });
  }
};
