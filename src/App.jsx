import React, { useState } from 'react';
import { Button, Container, Card, CardContent, Typography, MenuItem, Select, FormControl } from '@mui/material';
import EducacionForm from './components/EducacionForm';
import './App.css';

function App() {
  const [formType, setFormType] = useState(null);
  const [comunidadOption, setComunidadOption] = useState('');

  const handleEducacionClick = () => { {/* abre el formulario educativo */}
    setFormType('educacion');
    setComunidadOption('');
  };

  const handleComunidadChange = (event) => { {/* detecto los cambios de opcion en select de abierto a la comunidad */}
    const selectedValue = event.target.value;
    setComunidadOption(selectedValue);
    setFormType(selectedValue);
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ padding: '20px', textAlign: 'center', marginTop: formType == 'taller Docente' || formType =='taller Particulares'? '0px':'100px'}}>
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
              value={comunidadOption}
              displayEmpty
              onChange={handleComunidadChange}
              renderValue={(selected) => {
                if (selected.length === 0) { 
                  return <em>Abierto a la Comunidad</em>; {/* se muestra abierto a la comunidad en el select si no se selecciono una opcion */}
                }
                return selected;
              }}
            >
              <MenuItem value="" disabled >
                Abierto a la Comunidad
              </MenuItem>
              <MenuItem value="taller Docente">Taller Docentes</MenuItem>
              <MenuItem value="taller Particulares">Taller Particulares</MenuItem>
            </Select>
          </FormControl>
          {formType === 'educacion' && <EducacionForm />} {/* si el tipoFormulario es educación se muestra el FormularioEducacion */}
          {(formType === 'taller Docente' || formType === 'taller Particulares') && (
            <Typography variant="h4" align="center" style={{ marginTop:'50px' }}>
              Próximamente
            </Typography>
          )} {/* si el tipoFormulario es taller Docente o taller Particulares se muestra el mensaje próximamente */}
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;



