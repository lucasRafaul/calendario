import express from 'express';
import cors from 'cors';
import { Escuela, Horarios, PostTurno, horarioDisponible, getHorariosOcupados } from './apis/formEscuelas.js';
import { checkComunidadExists, PostTurnoComunidad } from './apis/formComunidad.js';
import { checkDocenteExists, PostTurnoDocente } from './apis/formDocente.js';

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

app.post('/post/comunidad', (req, res) => {
  try {
      PostTurnoComunidad(req); // Llamando a la función y pasando el objeto 'req'
      res.status(200).send('Datos insertados con éxito');
    } catch (error) {
      res.status(500).send('Error al insertar datos');
    }
})

app.post('/post/docente', (req, res) => {
  try {
      PostTurnoDocente(req); // Llamando a la función y pasando el objeto 'req'
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
app.get('/horarios/ocupados', async (req, res) => {
  const { fechaVisita } = req.query;

  try {
      const ocupados = await getHorariosOcupados(fechaVisita);
      res.json({ ocupados });
  } catch (error) {
      console.error('Error fetching occupied horarios:', error);
      res.status(500).json({ error: "Error fetching occupied horarios" });
  }
});

app.get('/comunidad_exists', async (req, res) => {
  try {
      const exists = await checkComunidadExists();
      res.json({ exists });
  } catch (error) {
      console.error('Error checking comunidad existence:', error);
      res.status(500).json({ error: "Error checking comunidad existence" });
  }
});

app.get('/docente_exists', async (req, res) => {
  try {
      const exists = await checkDocenteExists();
      res.json({ exists });
  } catch (error) {
      console.error('Error checking docente existence:', error);
      res.status(500).json({ error: "Error checking docente existence" });
  }
});


app.listen(3000)