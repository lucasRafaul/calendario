// Importación de librerías y componentes necesarios
import React, { useState, useEffect } from 'react';

import { Button, Container, Card, CardContent, Typography, MenuItem, Select, FormControl, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EducacionForm from './components/EducacionForm';
import ComunidadForm from './components/ComunidadForm';
import DocenteForm from './components/DocenteForm';
import './app.css'
import axios from 'axios';


function App() {
  // useStates para manejar el formulario actual y la existencia de cursos
  const [formActual, setFormActual] = useState('');
  const [comunidadData, setComunidadData] = useState(null);
  const [docenteData, setDocenteData] = useState(null);


  async function hayTalleres() {
    try {
      const comunidadResponse = await axios.get('http://localhost:3000/comunidad_data');
      setComunidadData(comunidadResponse.data);
    } catch (error) {
      console.error('Error fetching comunidad data:', error);
      setComunidadData(null);
    }

    try {
      const docenteResponse = await axios.get('http://localhost:3000/docente_data');
      setDocenteData(docenteResponse.data);
    } catch (error) {
      console.error('Error fetching docente data:', error);
      setDocenteData(null);
    }
  }

  // useEffect para verificar la existencia de cursos al cargar el componente
  useEffect(() => {
    hayTalleres();
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
    if (formActual === 'educacion' || formActual === 'taller Docente' || formActual === 'taller Comunidad') {
      setFormActual('');
    } else {
      window.location.href = '../ConectarLab.html';  
    }
    
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" className='form-container'>
      <Button
          variant="outlined"
          className="home-button"
          color="secondary"
          onClick={handleReturnHome}
           sx={{ width: '120px' }}
        ><HomeIcon />
        </Button>
        <Card sx={{ width: '100%', maxWidth: 600}} className='form-card'> 
          <CardContent>
            {/* Título del formulario */}
            <Typography variant="h5" component="div" gutterBottom style={{textAlign:"center"}} className='form-title'>
              Formulario de Inscripción
            </Typography>
            {/* Botón para visitas a escuelas */}
            <Button
              variant="contained"
              color="primary"
              className='visit-button'
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
                renderValue={(selected) => selected || "Talleres Abiertos a la Comunidad"}
                className='community-select'
              >
                <MenuItem value="" disabled>
                  Talleres Abiertos a la Comunidad
                </MenuItem>
                <MenuItem value="taller Docente">Talleres Docentes</MenuItem>
                <MenuItem value="taller Comunidad">Talleres Comunidad</MenuItem>
              </Select>
            </FormControl>
            {/* Renderizado condicional de formularios */}
            <Box sx={{ my: 2 }}>
              {formActual === 'educacion' && <EducacionForm />}
              {formActual === 'taller Docente' && (docenteData ? <DocenteForm talleres={docenteData}/> : (
                <Typography variant="h4" align="center">
                  Próximamente
                </Typography>
              ))}
              {formActual === 'taller Comunidad' && (comunidadData ? <ComunidadForm talleres={comunidadData}/> : (
                <Typography variant="h4" align="center">
                  Próximamente
                </Typography>
              ))}
            </Box>

                   {/* Botón para volver al inicio */}
       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>

      </Box>

          </CardContent>
        </Card>
      </Box>

    </Container>
  );
}

export default App;

