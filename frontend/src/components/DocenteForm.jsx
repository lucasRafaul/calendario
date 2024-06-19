import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const DocenteForm = () => {
  const [formData, setFormData] = useState({
    nombreApellido: '',
    escuela: '',
    dni: '',
    email: '',
    telefono: '',
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
    <Box component="form" onSubmit={handleSubmit} >
      <TextField
        label="Nombre y Apellido"
        name="nombreApellido"
        value={formData.nombreApellido}
        onChange={handleChange}
        required
      />
      <TextField
        label="Escuela"
        name="escuela"
        value={formData.escuela}
        onChange={handleChange}
        required
      />
      <TextField
        label="DNI"
        name="dni"
        type="number"
        value={formData.dni}
        onChange={handleChange}
        required
      />
      <TextField
        label="Correo Electrónico"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <TextField
        label="Número de Teléfono"
        name="telefono"
        type="tel"
        value={formData.telefono}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Enviar
      </Button>
    </Box>
  );
};

export default DocenteForm;
