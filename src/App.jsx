import React, { useState } from 'react';
import { Button, Container, Card, CardContent, Typography, MenuItem, Select, FormControl } from '@mui/material';
import EducacionForm from './components/EducacionForm';
import './App.css';

function App() {
  const [formType, setFormType] = useState(null);
  const [comunidadOption, setComunidadOption] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleEducacionClick = () => {
    setFormType('educacion');
    setComunidadOption('');
    setIsFormVisible(true);
  };

  const handleComunidadChange = (event) => {
    const selectedValue = event.target.value;
    setComunidadOption(selectedValue);
    setFormType(selectedValue);
    setIsFormVisible(selectedValue !== '');
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ padding: '20px', textAlign: 'center', maxWidth: isFormVisible ? '1000px' : '400px', width: '100%', transition: 'max-width 0.3s ease-in-out' }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Formulario de Inscripción
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
              <MenuItem value="taller Docente">Taller Docentes</MenuItem>
              <MenuItem value="taller Particulares">Taller Particulares</MenuItem>
            </Select>
          </FormControl>
          {formType === 'educacion' && <EducacionForm />}
          {(formType === 'taller Docente' || formType === 'taller Particulares') && (
            <Typography variant="h4" align="center" style={{ marginTop:'50px' }}>
              Próximamente
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;



