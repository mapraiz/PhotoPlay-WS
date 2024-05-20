// src/routes/respuestaRoutes.ts
import express from "express";
import {
  createRespuesta,
  updateRespuesta,
  deleteRespuesta
} from "../controllers/respuestaController";

const router = express.Router();

router.post("/respuestas", createRespuesta);
router.put("/respuestas/:id", updateRespuesta);
router.delete("/respuestas/:id", deleteRespuesta);

export default router;
