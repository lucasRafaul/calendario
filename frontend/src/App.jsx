import React, { useState, useEffect } from 'react';
import { Button, Container, Card, CardContent, Typography, MenuItem, Select, FormControl } from '@mui/material';
import EducacionForm from './components/EducacionForm';
import ParticularForm from './components/ParticularForm';
import DocenteForm from './components/DocenteForm';
import axios from 'axios';

function App() {
  const [formActual, setFormActual] = useState('');
  const [comunidadExists, setComunidadExists] = useState(false);
  const [docenteExists, setDocenteExists] = useState(false);


  useEffect(() => {
    async function checkCourses() {
      try {
        const comunidadResponse = await axios.get('http://localhost:3000/comunidad_exists');
        const docenteResponse = await axios.get('http://localhost:3000/docente_exists');

        setComunidadExists(comunidadResponse.data.exists);
        setDocenteExists(docenteResponse.data.exists);
      } catch (error) {
        console.error('Error checking course existence:', error);
      }
    }

    checkCourses();
  }, []);

  const handleEducacionClick = () => {
    setFormActual('educacion');
  };

  const handleComunidadChange = (e) => {
    const selectedValue = e.target.value;
    setFormActual(selectedValue);
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ padding: '20px', textAlign: 'center'}}>
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
          {formActual === 'taller Docente' && (docenteExists ? <DocenteForm /> : (
            <Typography variant="h4" align="center" style={{ marginTop: '50px' }}>
              Próximamente
            </Typography>
          ))}
          {formActual === 'taller Comunidad' && (comunidadExists ? <ParticularForm /> : (
            <Typography variant="h4" align="center" style={{ marginTop: '50px' }}>
              Próximamente
            </Typography>
          ))}
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;


