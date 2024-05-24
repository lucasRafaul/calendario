import React, { useState } from 'react';
import { Button, Container, Card, CardContent, Typography, MenuItem, Select, FormControl } from '@mui/material';
import EducacionForm from './components/EducacionForm';
import './App.css';

function App() {
  const [formType, setFormType] = useState(null);
  const [comunidadOption, setComunidadOption] = useState('');

  const handleEducacionClick = () => {
    setFormType('educacion');
  };

  const handleComunidadChange = (event) => {
    setComunidadOption(event.target.value);
    setFormType(event.target.value);
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ padding: '20px', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Seleccione una opción
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEducacionClick}
            fullWidth
            style={{ marginBottom: '10px' }}
          >
            Educación
          </Button>
          <FormControl fullWidth>
            <Select
              value={comunidadOption}
              displayEmpty
              onChange={handleComunidadChange}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Comunidad</em>;
                }
                return selected;
              }}
            >
              <MenuItem value="" disabled>
                Comunidad
              </MenuItem>
              <MenuItem value="tallerProfesor">Taller Profesor</MenuItem>
              <MenuItem value="tallerParticulares">Taller Particulares</MenuItem>
            </Select>
          </FormControl>
          {formType === 'educacion' && <EducacionForm />}
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;




