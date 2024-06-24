import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import axios from 'axios';

const DocenteForm = () => {
  const [formData, setFormData] = useState({
    nombreApellido: '',
    escuela: '',
    dni: '',
    email: '',
    telefono: '',
  });
  const [docenteData, setDocenteData] = useState(null)


  useEffect(() => {
    const fetchDocenteData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/docente_data');
        setDocenteData(response.data);
      } catch (error) {
        console.error('Error fetching comunidad data:', error);
      }
    };
    fetchDocenteData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:3000/post/docente", formData);
      alert('el turno se agrego');
  }catch(error){
      console.error('error al enviar el formulario',error);
      alert('error al cargar');
  }
  setFormData({
    nombreApellido: '',
    escuela: '',
    dni: '',
    email: '',
    telefono: '',
  })
    console.log(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
       {docenteData && (
        <>
          <Typography variant="h4" component="h2" gutterBottom>
            {docenteData.titulo}
          </Typography>
        </>)}



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
      </Box>
    </Box>
  );
};

export default DocenteForm;
