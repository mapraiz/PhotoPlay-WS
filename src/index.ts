// src/index.ts
import "reflect-metadata";
import express from "express";
import preguntaRoutes from "./routes/preguntaRoutes";
import respuestaRoutes from "./routes/respuestaRoutes";

const app = express();
const PORT = process.env.PORT || 1521;

app.use(express.json());

// Routes
app.use("/api", preguntaRoutes);
app.use("/api", respuestaRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});