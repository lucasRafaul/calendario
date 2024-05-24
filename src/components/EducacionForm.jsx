import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const EducacionForm = () => {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { marginBottom: 2 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
      noValidate
      autoComplete="off"
    >
      <TextField label="Nombre" variant="outlined" fullWidth />
      <TextField label="Edad" variant="outlined" fullWidth />
      <TextField label="Curso" variant="outlined" fullWidth />
      <Button variant="contained" color="primary">
        Enviar
      </Button>
    </Box>
  );
};

export default EducacionForm;
