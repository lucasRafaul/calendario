import React, { useState } from 'react';
import { TextField, Button, Box, FormControlLabel, Checkbox } from '@mui/material';

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
    prometo: false // New state for the checkbox
  });

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
    prometo: false // New state for the checkbox
    })
    // Here, you would typically send the data to the server
    // For now, let's just log the form data
    console.log(formData);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { marginBottom: 2 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        label="CUE"
        variant="outlined"
        fullWidth
        name="cue"
        value={formData.cue}
        onChange={handleChange}
      />
      <TextField
        label="Nombre de la Escuela"
        variant="outlined"
        fullWidth
        name="nombreEscuela"
        value={formData.nombreEscuela}
        onChange={handleChange}
      />
      <TextField
        label="Localidad de la Escuela"
        variant="outlined"
        fullWidth
        name="localidadEscuela"
        value={formData.localidadEscuela}
        onChange={handleChange}
      />
      <TextField
        label="Nombre del Director"
        variant="outlined"
        fullWidth
        name="nombreDirector"
        value={formData.nombreDirector}
        onChange={handleChange}
      />
      <TextField
        label="Grado"
        variant="outlined"
        fullWidth
        name="grado"
        value={formData.grado}
        onChange={handleChange}
      />
      <TextField
        label="Turno"
        variant="outlined"
        fullWidth
        name="turno"
        value={formData.turno}
        onChange={handleChange}
      />
      <TextField
        label="Cantidad de Alumnos"
        variant="outlined"
        fullWidth
        name="cantAlumnos"
        value={formData.cantAlumnos}
        onChange={handleChange}
      />
      <TextField
        label="Teléfono"
        variant="outlined"
        fullWidth
        name="telefono"
        value={formData.telefono}
        onChange={handleChange}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <FormControlLabel
        control={<Checkbox checked={formData.prometo} onChange={handleCheckboxChange} />}
        label="Prometo comportarme y mantener el lugar y las computadoras limpias y seguras durante nuestra visita."
      />
      <Button variant="contained" color="primary" type="submit">
        Enviar
      </Button>
    </Box>
  );
};

export default EducacionForm;


