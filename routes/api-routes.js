// routes/index.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const partidaController = require('../controllers/partidaController');
const preguntaController = require('../controllers/preguntaController');
const respuestaController = require('../controllers/respuestaController');
const temaController = require('../controllers/temaController');
//Para java
const partidaPreguntaController = require('../controllers/partidaPreguntaController');

// Rutas para Usuario
router.get('/usuarios', usuarioController.getUsuarios);
router.post('/usuarios', usuarioController.crearUsuario);
router.put('/usuarios/:id_usuario', usuarioController.actualizarUsuario);
router.delete('/usuarios/:id_usuario', usuarioController.eliminarUsuario);
router.get('/usuario/comprobar', usuarioController.comprobarUsuario);

// Rutas para Partida loladasdlaso
router.get('/partidas', partidaController.getPartidas);
router.post('/partidas', partidaController.crearPartida);
router.put('/partidas/:id_partida', partidaController.actualizarPartida);
router.delete('/partidas/:id_partida', partidaController.eliminarPartida);

// Rutas para Pregunta
router.get('/preguntas', preguntaController.getPreguntas);
router.post('/preguntas', preguntaController.crearPregunta);
router.put('/preguntas/:id_pregunta', preguntaController.actualizarPregunta);
router.delete('/preguntas/:id_pregunta', preguntaController.eliminarPregunta);
// Rutas para Pregunta Java
router.get('/preguntas/obtener', preguntaController.obtenerPreguntaYRespuestas);
router.get('/respuesta/correcta', preguntaController.obtenerRespuestaCorrecta);
router.get('/pregunta/aleatoria', preguntaController.obtenerPreguntaAleatoria);
router.get('/respuestas/aleatorias', preguntaController.obtenerRespuestasAleatorias);
// Rutas para Respuesta
router.get('/respuestas', respuestaController.getRespuestas);
router.post('/respuestas', respuestaController.crearRespuesta);
router.put('/respuestas/:id_respuesta', respuestaController.actualizarRespuesta);
router.delete('/respuestas/:id_respuesta', respuestaController.eliminarRespuesta);

// Rutas para Tema
router.get('/temas', temaController.getTemas);
router.post('/temas', temaController.crearTema);
router.put('/temas/:id_tema', temaController.actualizarTema);
router.delete('/temas/:id_tema', temaController.eliminarTema);

// Rutas para PartidaPregunta
router.get('/partidas-preguntas', partidaPreguntaController.getPartidasPreguntas);
router.post('/partidas-preguntas', partidaPreguntaController.crearPartidaPregunta);
router.put('/partidas-preguntas/:id_partida_pregunta', partidaPreguntaController.actualizarPartidaPregunta);
router.delete('/partidas-preguntas/:id_partida_pregunta', partidaPreguntaController.eliminarPartidaPregunta);



// Rutas para Pregunta
module.exports = router;
