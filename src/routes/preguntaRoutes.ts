// src/routes/preguntaRoutes.ts
import express from "express";
import {
  getAllPreguntas,
  getPreguntaById,
  createPregunta,
  updatePregunta,
  deletePregunta
} from "../controllers/preguntaController";

const router = express.Router();

router.get("/preguntas", getAllPreguntas);
router.get("/preguntas/:id", getPreguntaById);
router.post("/preguntas", createPregunta);
router.put("/preguntas/:id", updatePregunta);
router.delete("/preguntas/:id", deletePregunta);

export default router;
