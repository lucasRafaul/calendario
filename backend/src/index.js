import express from 'express';
import cors from 'cors';
import { Escuela, PostTurno } from './apis/formEscuelas.js';

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

app.post('/post', (req, res) => {
    try {
        PostTurno(req); // Llamando a la función y pasando el objeto 'req'
        res.status(200).send('Datos insertados con éxito');
      } catch (error) {
        res.status(500).send('Error al insertar datos');
      }
})

app.listen(3000)