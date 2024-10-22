import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box } from '@mui/material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ParticularFormModal = ({ open, onClose, selectedDate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
            label="Fecha Seleccionada"
            value={selectedDate ? format(selectedDate, 'PPPP', { locale: es }) : ''} 
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Nombre"
            name="name"
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

export default ParticularFormModal;
