import React, { useState, useContext } from 'react';
import { Button, Container, Card, CardContent, Typography, MenuItem, Select, FormControl } from '@mui/material';
import EducacionForm from './components/EducacionForm';
import ParticularForm from './components/ParticularForm';
import DocenteForm from './components/DocenteForm';

function App() {
  const [formActual, setFormActual] = useState('');

  const handleEducacionClick = () => {
    setFormActual('educacion');
  };

  const handleComunidadChange = (e) => {
    const selectedValue = e.target.value;
    setFormActual(selectedValue);
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ padding: '20px', textAlign: 'center', marginTop: formActual == 'taller Docente' || formActual =='taller Particulares'? '0px':'100px'}}>
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
            Visitas Escuelas
          </Button>
          <FormControl fullWidth>
            <Select
              value={formActual == 'taller Docente' || formActual == 'taller Comunidad' ? formActual : 'Abierto a la Comunidad'}
              displayEmpty
              onChange={handleComunidadChange}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Abierto a la Comunidad</em>;
                }
                return selected;
              }}
            >
              <MenuItem value="" disabled >
                Abierto a la Comunidad
              </MenuItem>
              <MenuItem value="taller Docente">Taller Docentes</MenuItem>
              <MenuItem value="taller Comunidad">Taller Comunidad</MenuItem>
            </Select>
          </FormControl>
          {formActual === 'educacion' && <EducacionForm />}
          {( formActual === 'taller Comunidad' || formActual === 'taller Docente') && (
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


