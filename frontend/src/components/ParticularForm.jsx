import React, { useState, useEffect, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box } from '@mui/material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ParticularForm = ({ open, onClose}) => {
  const [formData, setFormData] = useState({
    nombreApellido: 'lucas',
    edad: '',
    anioNacimiento: '',
    nombreApellidoTutor: '',
    telefono: '',
    email:'',

  });

  useEffect(() => {
    const handleInvalid = (e) => {
      const input = e.target;
      if (input.validity.valueMissing) {
        input.setCustomValidity('Por favor, completa este campo.');
      }
    };

    document.addEventListener('invalid', handleInvalid, true);

    return () => {
      document.removeEventListener('invalid', handleInvalid, true);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    e.target.setCustomValidity('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Formulario de Inscripción Particular</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Nombre"
            name="nonbreApellido"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Enviar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ParticularForm;
