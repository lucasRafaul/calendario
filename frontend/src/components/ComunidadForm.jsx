import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Typography, CardMedia, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const ComunidadForm = ({talleres}) => {
  const [index, setIndex] = useState(0);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/post/comunidad", {
        ...formData, tallerTitulo: talleres[index].titulo,
        tallerFecha: talleres[index].fecha,
      });
      alert('El turno se agregó');
      setFormData({
        nombreApellido: '',
        edad: '',
        fechaNacimiento: '',
        nombreApellidoTutor: '',
        telefono: '',
        email: '',
      });
    } catch (error) {
      console.error('Error al enviar el formulario', error);
      alert('Error al cargar');
    }
  };

  const handlePrevious = () => {
    setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : talleres.length - 1));
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex < talleres.length - 1 ? prevIndex + 1 : 0));
  };

  const tallerActual = talleres[index];

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
            {tallerActual.titulo}
          </Typography>
          {tallerActual.imagen && (
                      <CardMedia
                      component="img"
                      alt={tallerActual.titulo}
                      image={tallerActual.imagen}
                      title={tallerActual.titulo}
                      sx={{ 
                        display: 'block', 
                        margin: '0 auto', 
                        maxWidth: '35%', 
                        height: 'auto', 
                        marginBottom: 2  
                      }}
                    />
          )}

         <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={tallerActual.fecha}  
            disabled
            sx={{ mb: 2 }}
          />
        </Grid>
        </Grid>
        </Box>
        
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
      </Grid>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, gap: 2 }}>
        {talleres.length > 1 && (
          <IconButton onClick={handlePrevious} color="primary">
            <ArrowBackIosIcon />
          </IconButton>
        )}
        
        <Button 
          variant="contained" 
          color="primary" 
          type="submit" 
          sx={{ minWidth: '120px' }}
          endIcon={<SendIcon />}
        >
          Enviar
        </Button>

        {talleres.length > 1 && (
          <IconButton onClick={handleNext} color="primary">
            <ArrowForwardIosIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default ComunidadForm;