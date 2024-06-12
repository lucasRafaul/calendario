import React, { useState } from 'react';
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
        prometo: false,
        fechaVisita: '',
        horario: '', 
    });

    const [calendarOpen, setCalendarOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCheckboxChange = (e) => {
        const { checked } = e.target;
        setFormData({
            ...formData,
            prometo: checked
        });
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

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/turno_instituto/agregar',{
            formData
        })
        .then(function (response) {
            response.estado == 'okay' ? alert('se grabo correctamente') :  alert('error al grabar')
          })
          .catch(function (error) {
            console.log(error);
          });


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
            prometo: false,
            fechaVisita: '',
            horario: ''
        });
        console.log(formData);
    };

    return (
        <Box 
            component="form"
            autoComplete="on"
            onSubmit={handleSubmit}
            action='/turno_instituto'
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
            <select name='turno' svalue={formData.turno} label='turno' onChange={handleChange} required>
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
            </select>
            <TextField style={{marginBottom:'7px'}}
                label="Cantidad de Alumnos"
                variant="outlined"
                fullWidth
                name="cantAlumnos"
                value={formData.cantAlumnos}
                onChange={handleChange}
                inputProps={{ max: 25}}
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
            <FormControlLabel 
                control={<Checkbox checked={formData.prometo} onChange={handleCheckboxChange} />}
                label="Prometo comportarme y mantener el lugar y las computadoras limpias y seguras durante nuestra visita."
                required
            />
            <Button variant="contained" color="primary" type="submit">
                Enviar
            </Button>
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




