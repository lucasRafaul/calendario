import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import axios from 'axios';

const DocenteForm = ({talleres}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/post/docente",{
        ...formData, tallerTitulo: talleres[currentIndex].titulo,
        tallerFecha: talleres[currentIndex].fecha,
      });
      alert('El turno se agregó');
      setFormData({
        nombreApellido: '',
        escuela: '',
        dni: '',
        email: '',
        telefono: '',
      });
    } catch (error) {
      console.error('Error al enviar el formulario', error);
      alert('Error al cargar');
    }
  };
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : talleres.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < talleres.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography 
            variant="h5" 
            component="h2" 
            gutterBottom
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              color: '#1a237e',
              borderBottom: '2px solid #1a237e',
              paddingBottom: '8px',
              marginBottom: '16px',
              display: 'inline-block',
              textTransform: 'capitalize',
              letterSpacing: '0.5px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              fontSize: '1.5rem', 
            }}
          >
            {talleres[currentIndex].titulo}
          </Typography>
        </Box>
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
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button variant="contained" color="primary" type="submit" sx={{ width: '120px' }}>
          Enviar
        </Button>
        {talleres.length > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 2 }}>
              <Button onClick={handlePrevious}>
                Anterior
              </Button>
              <Button onClick={handleNext}>
                Siguiente
              </Button>
            </Box>
          )}
      </Box>
    </Box>
  );
};

export default DocenteForm;