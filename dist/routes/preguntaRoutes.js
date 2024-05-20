"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/preguntaRoutes.ts
const express_1 = __importDefault(require("express"));
const preguntaController_1 = require("../controllers/preguntaController");
const router = express_1.default.Router();
router.get("/preguntas", preguntaController_1.getAllPreguntas);
router.get("/preguntas/:id", preguntaController_1.getPreguntaById);
router.post("/preguntas", preguntaController_1.createPregunta);
router.put("/preguntas/:id", preguntaController_1.updatePregunta);
router.delete("/preguntas/:id", preguntaController_1.deletePregunta);
exports.default = router;
//# sourceMappingURL=preguntaRoutes.js.map