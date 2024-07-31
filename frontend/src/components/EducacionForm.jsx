import React, { useState} from 'react';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CalendarDate from './CalendarDate';
import Horario from './Horario';
import axios from 'axios';

const EducacionForm = () => {
    const [formData, setFormData] = useState({
        cue: '',
        nombreEscuela: '',
        localidadEscuela: '',
        nombreDirector: '',
        grado: '',
        turno: 'Mañana',
        cantAlumnos: '',
        telefono: '',
        email: '',
        fechaVisita: '',
        horario: ''
    });

    const [errors, setErrors] = useState({});
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [horarioOpen, setHorarioOpen] = useState(false);
    const [showHorarioInput, setShowHorarioInput] = useState(false);
    const [horariosOcupados, setHorariosOcupados] = useState([]);

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'cue':
                if (!/^\d+$/.test(value) || value.length < 1) error = 'CUE debe ser un número válido';
                break;
            case 'cantAlumnos':
                if (value < 1 || value > 25) error = 'Cantidad de Alumnos debe ser entre 1 y 25';
                break;
                case 'telefono':
                    if (!/^\+?[\d\s()-]{7,}$/.test(value)) error = 'Teléfono debe ser un número válido';
                    break;
            case 'email':
                if (!/\S+@\S+\.\S+/.test(value)) error = 'Email inválido';
                break;
            default:
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = async (date) => {
        const formattedDate = date.toLocaleDateString('es-ES'); 
        setFormData(prev => ({ ...prev, fechaVisita: formattedDate }));
        try {
            const response = await axios.get(`http://localhost:3000/horarios/ocupados?fechaVisita=${formattedDate}`);
            setHorariosOcupados(response.data.ocupados);
        } catch (error) {
            console.error('Error fetching occupied horarios:', error);
        }
        setHorarioOpen(true);
    };

    const handleHorarioChange = (horario) => {
        setFormData(prev => ({ ...prev, horario }));
        setShowHorarioInput(true);
        setHorarioOpen(false);
    };

    const handleHorarioInputClick = () => {
        formData.fechaVisita ? setHorarioOpen(true) : setCalendarOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.horario) {
            alert('Por favor, seleccione un horario');
            return;
        }

        const formErrors = Object.keys(formData).reduce((acc, key) => {

            const error = validateField(key, formData[key]);
            if (error) acc[key] = error;
            return acc;
        }, {});

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            alert('Por favor, corrija los errores antes de enviar el formulario.');
            return;
        }

        try {
            await axios.post("http://localhost:3000/post", formData);
            alert('El turno se agregó');
            setFormData({
                cue: '',
                nombreEscuela: '',
                localidadEscuela: '',
                nombreDirector: '',
                grado: '',
                turno: 'Mañana',
                cantAlumnos: '',
                telefono: '',
                email: '',
                fechaVisita: '',
                horario: ''
            });
            setShowHorarioInput(false);
            setErrors({});
        } catch (error) {
            console.error('Error al enviar el formulario', error);
            alert('Error al cargar. Por favor, intente nuevamente.');
        }
    };

    return (
        <Box component="form"  onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1 } }}>
            <TextField
                label="CUE"
                variant="outlined"
                fullWidth
                name="cue"
                type="number"
                value={formData.cue}
                onChange={handleChange}
                error={!!errors.cue}
                helperText={errors.cue}
                required
            />
            <TextField
                label="Nombre de la Escuela"
                variant="outlined"
                fullWidth
                name="nombreEscuela"
                value={formData.nombreEscuela}
                onChange={handleChange}
                required
            />
            <TextField
                label="Localidad de la Escuela"
                variant="outlined"
                fullWidth
                name="localidadEscuela"
                value={formData.localidadEscuela}
                onChange={handleChange}
                required
            />
            <TextField
                label="Nombre del Director"
                variant="outlined"
                fullWidth
                name="nombreDirector"
                value={formData.nombreDirector}
                onChange={handleChange}
                required
            />
            <TextField
                label="Grado"
                variant="outlined"
                fullWidth
                name="grado"
                value={formData.grado}
                onChange={handleChange}
                required
            />
            <FormControl fullWidth variant="outlined" sx={{ m: 1 }}>
                <InputLabel id="turno-label">Turno</InputLabel>
                <Select
                    labelId="turno-label"
                    id="turno"
                    value={formData.turno}
                    onChange={handleChange}
                    label="Turno"
                    name="turno"
                >
                    <MenuItem value="Mañana">Mañana</MenuItem>
                    <MenuItem value="Tarde">Tarde</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Cantidad de Alumnos"
                variant="outlined"
                fullWidth
                name="cantAlumnos"
                type="number"
                value={formData.cantAlumnos}
                onChange={handleChange}
                error={!!errors.cantAlumnos}
                helperText={errors.cantAlumnos}
                InputProps={{inputProps: { min: 1, max: 25 }}}
                required
            />
            <TextField
                label="Teléfono"
                variant="outlined"
                fullWidth
                name="telefono"
                type="tel"
                value={formData.telefono}
                onChange={handleChange}
                error={!!errors.telefono}
                helperText={errors.telefono}
                required
                inputProps={{
                    pattern: "^\\+?[\\d\\s()-]{7,}$",
                    title: "Ingrese un número de teléfono válido"
                }}
            />
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                required
            />
            <TextField 
                label="Fecha de la Visita"
                variant="outlined"
                fullWidth
                name="fechaVisita"
                value={formData.fechaVisita}
                onClick={() => setCalendarOpen(true)}
                InputProps={{
                    readOnly: true,
                }}
                required
            />
            
            {showHorarioInput && (
                <TextField 
                    label="Horario Seleccionado"
                    variant="outlined"
                    fullWidth
                    name="horario"
                    value={formData.horario}
                    onClick={handleHorarioInputClick}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            )}

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button variant="contained" color="primary" type="submit" sx={{ width: '120px' }}>
                    Enviar
                </Button>
            </Box>

            <CalendarDate
                open={calendarOpen}
                onClose={() => setCalendarOpen(false)}
                onDateClick={handleDateChange}
                selectedDate={formData.fechaVisita}
            />

            <Horario 
                open={horarioOpen} 
                onClose={() => setHorarioOpen(false)} 
                onHorarioChange={handleHorarioChange} 
                horariosOcupados={horariosOcupados}
            />
        </Box>
    );
};

export default EducacionForm;