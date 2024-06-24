// Importación de librerías y componentes necesarios
import React, { useState, useEffect } from 'react';
import { Button, Container, Card, CardContent, Typography, MenuItem, Select, FormControl, Box } from '@mui/material';
import EducacionForm from './components/EducacionForm';
import ParticularForm from './components/ParticularForm';
import DocenteForm from './components/DocenteForm';
import axios from 'axios';

function App() {
  // useStates para manejar el formulario actual y la existencia de cursos
  const [formActual, setFormActual] = useState('');
  const [comunidadExists, setComunidadExists] = useState(false);
  const [docenteExists, setDocenteExists] = useState(false);

  // useEffect para verificar la existencia de cursos al cargar el componente
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

  // Controlador de eventos para cambio en el formulario, pone el formActual al valor "educacion"
  const handleEducacionClick = () => {
    setFormActual('educacion');
  };

  // Controlador de eventos para cambio en el formulario, agarra el valor del select, y lo pone en el formActual
  const handleComunidadChange = (e) => {
    const selectedValue = e.target.value;
    setFormActual(selectedValue);
  };

  // Controlador de eventos para cambio en el formulario, manda al usuario al inicio del sistema
  const handleReturnHome = () => {
    setFormActual('');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Card sx={{ width: '100%', maxWidth: 600 }}>
          <CardContent>
            {/* Título del formulario */}
            <Typography variant="h5" component="div" gutterBottom style={{textAlign:"center"}}>
              Formulario de Inscripción
            </Typography>
            {/* Botón para visitas a escuelas */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleEducacionClick}
              fullWidth
              sx={{ mb: 2 }}
            >
              Visitas Escuelas
            </Button>
            {/* Selector para talleres */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Select sx={{
                  textAlign: 'center',
                  '& .MuiSelect-select': {
                    paddingRight: '0px !important',
                  },
                }}
                value={formActual === 'taller Docente' || formActual === 'taller Comunidad' ? formActual : ''}
                displayEmpty
                onChange={handleComunidadChange}
                renderValue={(selected) => selected || "Abierto a la Comunidad"}
              >
                <MenuItem value="" disabled>
                  Abierto a la Comunidad
                </MenuItem>
                <MenuItem value="taller Docente">Taller Docentes</MenuItem>
                <MenuItem value="taller Comunidad">Taller Comunidad</MenuItem>
              </Select>
            </FormControl>
            {/* Renderizado condicional de formularios */}
            <Box sx={{ my: 2 }}>
              {formActual === 'educacion' && <EducacionForm />}
              {formActual === 'taller Docente' && (docenteExists ? <DocenteForm /> : (
                <Typography variant="h4" align="center">
                  Próximamente
                </Typography>
              ))}
              {formActual === 'taller Comunidad' && (comunidadExists ? <ParticularForm /> : (
                <Typography variant="h4" align="center">
                  Próximamente
                </Typography>
              ))}
            </Box>
             {/* Botón para volver al inicio */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleReturnHome}
                  sx={{ width: '120px' }}
                >
                          Inicio    
                </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default App;

