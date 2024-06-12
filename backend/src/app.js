const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config');

const turnosInstituto = require('./modulos/turnos/rutas.js');
const usuarios = require('./modulos/usuarios/rutas.js')
const error = require('./red/errors.js');
const autenticacion = require('./modulos/autenticacion/rutas.js');



const app = express ();

var corsOpcions = {
    origin: '*',
    optionsSuccessStatus: 200
}

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

//Configuracion
app.set('port', config.app.port)

//rutas
app.use('/api/turnos', turnosInstituto);
app.use('/api/usuarios', usuarios);


app.use(error);

app.use('/api/autenticacion', autenticacion);

module.exports = app; 