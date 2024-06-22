import express from 'express';
import cors from 'cors';
import { Escuela, Horarios, PostTurno, horarioDisponible } from './apis/formEscuelas.js';

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: true, }));
app.use(cors())

app.get('/', (req, res) => {
    res.json({ message: "ok" });
})

app.get('/get', (req, res) => {
    res.json(Escuela);
})  

app.get('/get_horarios', (req, res) => {
  res.json(Horarios);
})

app.post('/post', (req, res) => {
    try {
        PostTurno(req); // Llamando a la función y pasando el objeto 'req'
        res.status(200).send('Datos insertados con éxito');
      } catch (error) {
        res.status(500).send('Error al insertar datos');
      }
})

app.get('/horario/disponible', async (req, res) => {
  const { id, fechaVisita } = req.query;

  try {
      const isAvailable = await horarioDisponible(id, fechaVisita);

      res.json({ available: isAvailable });
  } catch (error) {
      console.error('Error checking horario availability:', error);
      res.status(500).json({ error: "Error checking horario availability" });
  }
});

app.listen(3000)