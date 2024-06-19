import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const ParticularForm = () => {
  const [formData, setFormData] = useState({
    nombreApellido: '',
    edad: '',
    fechaNacimiento: '',
    nombreApellidoTutor: '',
    telefono: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Apellido y Nombre (del niño)"
        name="nombreApellido"
        value={formData.nombreApellido}
        onChange={handleChange}
        required
      />
      <TextField
        label="Edad (del niño)"
        name="edad"
        type="number"
        value={formData.edad}
        onChange={handleChange}
        required
      />
      <TextField
        label="Fecha de Nacimiento (del niño)"
        name="fechaNacimiento"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formData.fechaNacimiento}
        onChange={handleChange}
        required
      />
      <TextField
        label="Nombre y Apellido del Tutor"
        name="nombreApellidoTutor"
        value={formData.nombreApellidoTutor}
        onChange={handleChange}
        required
      />
      <TextField
        label="Teléfono del Tutor"
        name="telefono"
        type="tel"
        value={formData.telefono}
        onChange={handleChange}
        required
      />
      <TextField
        label="Correo Electrónico del Tutor"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Enviar
      </Button>
    </Box>
  );
};

export default ParticularForm;
