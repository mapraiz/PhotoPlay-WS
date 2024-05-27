const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const partidaController = require('../controllers/partidaController');
const preguntaController = require('../controllers/preguntaController');
const respuestaController = require('../controllers/respuestaController');
const temaController = require('../controllers/temaController');
const partidaPreguntaController = require('../controllers/partidaPreguntaController');
const controller = require('../javaController'); // Ensure the correct controller is imported

const javaController = require('./javaController');
// Route for checking login
router.post('/login', javaController.login);

// Route to get the correct answer
router.get('/obtenerRespuestaCorrecta', javaController.obtenerRespuestaCorrecta);

// Route to get a random question
router.get('/obtenerPreguntaAleatoria', javaController.obtenerPreguntaAleatoria);

// Route to get random answers
router.get('/obtenerRespuestasAleatorias', javaController.obtenerRespuestasAleatorias);

// Route to get a question and its answers
router.get('/obtenerPreguntaYRespuestas', javaController.obtenerPreguntaYRespuestas);

// Routes for Usuario
router.get('/usuarios', usuarioController.getUsuarios);
router.post('/usuarios', usuarioController.crearUsuario);
router.put('/usuarios/:id_usuario', usuarioController.actualizarUsuario);
router.delete('/usuarios/:id_usuario', usuarioController.eliminarUsuario);

// Routes for Partida
router.get('/partidas', partidaController.getPartidas);
router.post('/partidas', partidaController.crearPartida);
router.put('/partidas/:id_partida', partidaController.actualizarPartida);
router.delete('/partidas/:id_partida', partidaController.eliminarPartida);

// Routes for Pregunta
router.get('/preguntas', preguntaController.getPreguntas);
router.post('/preguntas', preguntaController.crearPregunta);
router.put('/preguntas/:id_pregunta', preguntaController.actualizarPregunta);
router.delete('/preguntas/:id_pregunta', preguntaController.eliminarPregunta);

// Routes for Respuesta
router.get('/respuestas', respuestaController.getRespuestas);
router.post('/respuestas', respuestaController.crearRespuesta);
router.put('/respuestas/:id_respuesta', respuestaController.actualizarRespuesta);
router.delete('/respuestas/:id_respuesta', respuestaController.eliminarRespuesta);

// Routes for Tema
router.get('/temas', temaController.getTemas);
router.post('/temas', temaController.crearTema);
router.put('/temas/:id_tema', temaController.actualizarTema);
router.delete('/temas/:id_tema', temaController.eliminarTema);

// Routes for PartidaPregunta
router.get('/partidas-preguntas', partidaPreguntaController.getPartidasPreguntas);
router.post('/partidas-preguntas', partidaPreguntaController.crearPartidaPregunta);
router.put('/partidas-preguntas/:id_partida_pregunta', partidaPreguntaController.actualizarPartidaPregunta);
router.delete('/partidas-preguntas/:id_partida_pregunta', partidaPreguntaController.eliminarPartidaPregunta);

module.exports = router;
