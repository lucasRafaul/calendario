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
        prometo: false,
        fechaVisita: '',
        horario: '', 
    });

    const [calendarOpen, setCalendarOpen] = useState(false);
    const [fechasOcupadas, setFechasOcupadas] = useState([]);

    useEffect(() => {
        if (formData.fechaVisita) {
          const fetchTurnos = async () => {
            try {
              const response = await axios.get('/api/turnos/turnosAgregados', { params: { fechaVisita: formData.fechaVisita } })
              console.log('Response Data:', response.data); // Log the response data
              if (Array.isArray(response.data)) {
                setFechasOcupadas(response.data.map(slot => slot.horario));
              } else {
                console.error('Unexpected response data format:', response.data);
              }
            } catch (error) {
              console.error('Error fetching turnos', error);
            }
          };
          fetchTurnos();
        }
      }, [formData.fechaVisita]);

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

    const handleSubmit =  async (e) => {
        e.preventDefault();
        const { prometo, ...dataToSend } = formData; 
        try{
            await axios.post("/api/turnos/agregarTurno",formData);
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
            action='/api/turnos'
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




