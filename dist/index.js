"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const preguntaRoutes_1 = __importDefault(require("./routes/preguntaRoutes"));
const respuestaRoutes_1 = __importDefault(require("./routes/respuestaRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 1521;
app.use(express_1.default.json());
// Routes
app.use("/api", preguntaRoutes_1.default);
app.use("/api", respuestaRoutes_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map