import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, FormControlLabel, Checkbox } from '@mui/material';
import CalendarDate from './CalendarDate';
import axios from 'axios';

const EducacionForm = () => {
    const [formData, setFormData] = useState({
        cue: '',
        nombreEscuela: '',
        localidadEscuela: '',
        nombreDirector: '',
        grado: '',
        turno: '',
        cantAlumnos: '',
        telefono: '',
        email: '',
        fechaVisita: '',
        horario: ''
    });

    const [calendarOpen, setCalendarOpen] = useState(false);

    useEffect(() => {
        // Set default values here
        setFormData(prevData => ({
            ...prevData,
            turno: 'Mañana',
            cantAlumnos: '',  
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'cantAlumnos') {
            // Asegurarse de que el valor sea un número
            if (/^\d*$/.test(value)) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: value === '' ? 0 : Number(value)
                }));
            }
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };

    const handleDateChange = (date) => {
        const formattedDate = date.toLocaleDateString('es-ES'); 
        setFormData({
            ...formData,
            fechaVisita: formattedDate
        });
    };

    const handleHorarioChange = (horario) => {
        setFormData({
            ...formData,
            horario
        });
    };

    const handleSubmit =  async (e) => {
        e.preventDefault();
        if (!formData.horario) {
            alert('Por favor, seleccione un horario');
            return;
          }
        try{
            await axios.post("http://localhost:3000/post", formData);
            alert('el turno se agrego');
        }catch(error){
            console.error('error al enviar el formulario',error);
            alert('error al cargar');
        }
        setFormData({
            cue: '',
            nombreEscuela: '',
            localidadEscuela: '',
            nombreDirector: '',
            grado: '',
            turno: '',
            cantAlumnos: '',
            telefono: '',
            email: '',
            fechaVisita: '',
            horario: ''
        });
    };

    return (
        <Box 
            component="form"
            autoComplete="on"
            onSubmit={handleSubmit}
            action="http://localhost:3000/post"
            method='POST'
        >
            <TextField style={{marginBottom:'7px', marginTop:'5px' }}
                label="CUE"
                variant="outlined"
                fullWidth
                name="cue"
                value={formData.cue}
                onChange={handleChange}
                required
            />
            <TextField style={{marginBottom:'7px'}}
                label="Nombre de la Escuela"
                variant="outlined"
                fullWidth
                name="nombreEscuela"
                value={formData.nombreEscuela}
                onChange={handleChange}
                required
            />
            <TextField style={{marginBottom:'7px'}}
                label="Localidad de la Escuela"
                variant="outlined"
                fullWidth
                name="localidadEscuela"
                value={formData.localidadEscuela}
                onChange={handleChange}
                required
            />
            <TextField style={{marginBottom:'7px'}}
                label="Nombre del Director"
                variant="outlined"
                fullWidth
                name="nombreDirector"
                value={formData.nombreDirector}
                onChange={handleChange}
                required
            />
            <TextField style={{marginBottom:'7px'}}
                label="Grado"
                variant="outlined"
                fullWidth
                name="grado"
                value={formData.grado}
                onChange={handleChange}
                required
            />
            <TextField style={{ marginBottom: '7px' }}
                select
                label="Turno"
                variant="outlined"
                fullWidth
                name="turno"
                defaultValue={formData.turno}
                onChange={handleChange}
                required
                SelectProps={{
                    native: true,
                }}
            >
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
            </TextField>
            <TextField style={{marginBottom:'7px'}}
                label="Cantidad de Alumnos"
                variant="outlined"
                fullWidth
                name="cantAlumnos"
                type="number"
                value={formData.cantAlumnos}
                onChange={handleChange}
                InputProps={{inputProps:{min: 1, max:25}}}
                required
            />
            <TextField style={{marginBottom:'7px'}}
                label="Teléfono"
                variant="outlined"
                fullWidth
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
            />
            <TextField style={{marginBottom:'7px'}}
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <TextField style={{marginBottom:'7px'}}
                label="Fecha de la Visita"
                variant="outlined"
                fullWidth
                name="fechaVisita"
                placeholder="dd/mm/yyyy"
                value={formData.fechaVisita}
                onChange={handleChange}
                onClick={() => setCalendarOpen(true)}
                required
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button variant="contained" color="primary" type="submit" sx={{ width: '120px' }}>
                Enviar
            </Button>
            
            </Box>

            <CalendarDate
                open={calendarOpen}
                onClose={() => setCalendarOpen(false)}
                onDateClick={handleDateChange}
                onHorarioChange={handleHorarioChange}
            />
        </Box>
    );
};

export default EducacionForm;




