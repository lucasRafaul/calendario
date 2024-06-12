const express = require('express');
const router = express.Router();
const controlador = require('./controlador.js');

// POST route to save a new turno
router.post('/agregarTurno', async (req, res) => {
  try {
    const response = await controlador.agregarTurno(req.body);
    res.status(201).send(response.message);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

// GET route to fetch turnos by date
router.get('/turnosAgregados', async (req, res) => {
  try {
    const { fechaVisita } = req.query;
    const turnos = await controlador.getTurnosPorFecha(fechaVisita);
    console.log('turnos: ', turnos);
    res.status(200).json(turnos);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;