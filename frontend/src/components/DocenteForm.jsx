import React, { useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';

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
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nombre y Apellido"
            name="nombreApellido"
            value={formData.nombreApellido}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Escuela"
            name="escuela"
            value={formData.escuela}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="DNI"
            name="dni"
            type="number"
            value={formData.dni}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Correo Electrónico"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Número de Teléfono"
            name="telefono"
            type="tel"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DocenteForm;
