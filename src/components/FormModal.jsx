import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const FormModal = ({ open, onClose, selectedDate, selectedHorario }) => {
  const [formData, setFormData] = useState({
    institucion: '',
    tutor: '',
    dni:'',
    nroTelefono:'',
    email:'',
    cantAlumnos: '',
    nivelEducacion: '',
    fecha:{selectedDate,selectedHorario},
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
      <DialogTitle>Formulario de Reserva</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField  
            label="Fecha Seleccionada"
            value={selectedDate ? format(selectedDate, 'd/MM/yyyy', { locale: es }) : ''} 
            fullWidth
            margin="normal"
            disabled
          />
          <TextField label='Horario' value={selectedHorario} fullWidth margin='normal' disabled>

          </TextField>
          <TextField
            label="Nombre de la institución"
            name="institucion"
            value={formData.institucion}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Nombre del maestro o responsable"
            name="tutor"
            value={formData.tutor}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
          label='DNI'
          name='dni'
          value={formData.dni}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          
          />
          <TextField
          label='Numero de Telefono'
          name='nroTelefono'
          value={formData.nroTelefono}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          
          />
          <TextField
          label='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          
          />
          <TextField
            label="Cantidad aproximada de niños asistiendo"
            type="number"
            name="cantAlumnos"
            value={formData.cantAlumnos}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth required margin="normal">
            <InputLabel id="schoolType-label">Nivel escolar</InputLabel>
            <Select
              labelId="nivelEducacion-label"
              name="nivelEducacion"
              value={formData.nivelEducacion}
              onChange={handleChange}
              label="Nivel escolar"
            >
              <MenuItem value="">
                <em>Seleccione una opción</em>
              </MenuItem>
              <MenuItem value="secundaria">Secundaria</MenuItem>
              <MenuItem value="primaria">Primaria</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Enviar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;


