import React, { useState } from 'react';
import { TextField, Button, Box, FormControlLabel, Checkbox } from '@mui/material';
import CalendarDate from './CalendarDate';
import  './EducacionForm.css'

const EducacionForm = () => {
  const [formData, setFormData] = useState({
    cue: '',
    nombreEscuela: '',
    localidadEscuela: '',
    nombreDirector: '',
    grado: '',
    turno: '',
    cantAlumnos: '',
    telefono: '',
    email: '',
    prometo: false,
    fechaVisita: '' // Changed to string for manual input
  });

  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData({
      ...formData,
      prometo: checked
    });
  };

  const handleDateChange = (date) => {
    const formattedDate = date.toLocaleDateString('es-ES'); // Format date as dd/mm/yyyy
    setFormData({
      ...formData,
      fechaVisita: formattedDate
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      cue: '',
      nombreEscuela: '',
      localidadEscuela: '',
      nombreDirector: '',
      grado: '',
      turno: '',
      cantAlumnos: '',
      telefono: '',
      email: '',
      prometo: false,
      fechaVisita: ''
    });
    console.log(formData);
  };

  return (
    <Box 
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField style={{marginBottom:'7px', marginTop:'5px' }}
        label="CUE"
        variant="outlined"
        fullWidth
        name="cue"
        value={formData.cue}
        onChange={handleChange}
      />
      <TextField style={{marginBottom:'7px'}}
        label="Nombre de la Escuela"
        variant="outlined"
        fullWidth
        name="nombreEscuela"
        value={formData.nombreEscuela}
        onChange={handleChange}
      />
      <TextField style={{marginBottom:'7px'}}
        label="Localidad de la Escuela"
        variant="outlined"
        fullWidth
        name="localidadEscuela"
        value={formData.localidadEscuela}
        onChange={handleChange}
      />
      <TextField style={{marginBottom:'7px'}}
        label="Nombre del Director"
        variant="outlined"
        fullWidth
        name="nombreDirector"
        value={formData.nombreDirector}
        onChange={handleChange}
      />
      <TextField style={{marginBottom:'7px'}}
        label="Grado"
        variant="outlined"
        fullWidth
        name="grado"
        value={formData.grado}
        onChange={handleChange}
      />
      <TextField style={{marginBottom:'7px'}}
        label="Turno"
        variant="outlined"
        fullWidth
        name="turno"
        value={formData.turno}
        onChange={handleChange}
      />
      <TextField style={{marginBottom:'7px'}}
        label="Cantidad de Alumnos"
        variant="outlined"
        fullWidth
        name="cantAlumnos"
        value={formData.cantAlumnos}
        onChange={handleChange}
      />
      <TextField style={{marginBottom:'7px'}}
        label="Teléfono"
        variant="outlined"
        fullWidth
        name="telefono"
        value={formData.telefono}
        onChange={handleChange}
      />
      <TextField style={{marginBottom:'7px'}}
        label="Email"
        variant="outlined"
        fullWidth
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField style={{marginBottom:'7px'}}
        label="Fecha de la Visita"
        variant="outlined"
        fullWidth
        name="fechaVisita"
        placeholder="dd/mm/yyyy"
        value={formData.fechaVisita}
        onChange={handleChange}
        onClick={() => setCalendarOpen(true)}
      />
      <FormControlLabel 
        control={<Checkbox checked={formData.prometo} onChange={handleCheckboxChange} />}
        label="Prometo comportarme y mantener el lugar y las computadoras limpias y seguras durante nuestra visita."
      />
      <Button variant="contained" color="primary" type="submit">
        Enviar
      </Button>
      <CalendarDate
        open={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        onDateClick={handleDateChange}
      />
    </Box>
  );
};

export default EducacionForm;




