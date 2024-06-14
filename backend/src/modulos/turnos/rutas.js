const express = require('express');
const router = express.Router();
const controlador = require('./index.js');

// POST route to save a new turno
router.post('/agregarTurno', async (req, res) => {
  try {
      const response = await controlador.agregarTurno(req.body);
      res.json(response);
      res.status(201).send(response.message);
  } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
  }
});
// GET route to fetch turnos by date
router.get('/turnosAgregados', async (req, res) => {
  try {
      const { fechaVisita,horario } = req.query;
      const turnos = await controlador.getTurnosPorFecha(fechaVisita,horario);
      res.json(turnos);
  } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
  }
});
module.exports = router;