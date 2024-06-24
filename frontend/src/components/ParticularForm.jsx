import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography, CardMedia} from '@mui/material';
import axios from 'axios';

const ParticularForm = () => {
  const [formData, setFormData] = useState({
    nombreApellido: '',
    edad: '',
    fechaNacimiento: '',
    nombreApellidoTutor: '',
    telefono: '',
    email: '',
  });
  const [comunidadData, setComunidadData] = useState(null);

  useEffect(() => {
    const fetchComunidadData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/comunidad_data');
        setComunidadData(response.data);
      } catch (error) {
        console.error('Error fetching comunidad data:', error);
      }
    };
    fetchComunidadData();
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
      await axios.post("http://localhost:3000/post/comunidad", formData);
      alert('el turno se agrego');
  }catch(error){
      console.error('error al enviar el formulario',error);
      alert('error al cargar');
  }
  setFormData({
    nombreApellido: '',
    edad: '',
    fechaNacimiento: '',
    nombreApellidoTutor: '',
    telefono: '',
    email: '',
  })
    console.log(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {comunidadData && (
        <>
          <Typography variant="h4" component="h2" gutterBottom>
            {comunidadData.titulo}
          </Typography>
          <CardMedia
            component="img"
            alt={comunidadData.titulo}
            image={comunidadData.imagen}
            title={comunidadData.titulo}
            sx={{ display: 'block', 
              margin: '0 auto', 
              maxWidth: '20%', 
              height: 'auto', 
              marginBottom: 2  }}
          />
        </>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Apellido y Nombre (del niño)"
            name="nombreApellido"
            value={formData.nombreApellido}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Edad (del niño)"
            name="edad"
            type="number"
            value={formData.edad}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Fecha de Nacimiento (del niño)"
            name="fechaNacimiento"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nombre y Apellido del Tutor"
            name="nombreApellidoTutor"
            value={formData.nombreApellidoTutor}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Teléfono del Tutor"
            name="telefono"
            type="tel"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Correo Electrónico del Tutor"
            name="email"
            type="email"
            value={formData.email}
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

export default ParticularForm;
