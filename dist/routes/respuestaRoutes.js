"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/respuestaRoutes.ts
const express_1 = __importDefault(require("express"));
const respuestaController_1 = require("../controllers/respuestaController");
const router = express_1.default.Router();
router.post("/respuestas", respuestaController_1.createRespuesta);
router.put("/respuestas/:id", respuestaController_1.updateRespuesta);
router.delete("/respuestas/:id", respuestaController_1.deleteRespuesta);
exports.default = router;
//# sourceMappingURL=respuestaRoutes.js.map