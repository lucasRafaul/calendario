import React, { useState, useEffect} from 'react';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Autocomplete} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Calendario from './Calendario';
import Horario from './Horario';
import pdf from '/ejemplopdf.pdf';
import PdfDownloadComponent from './Pdf';
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

    const [errores, setErrores] = useState({});
    const [calendarioOpen, setCalendarioOpen] = useState(false);
    const [horarioOpen, setHorarioOpen] = useState(false);
    const [mostrarHorarioInput, setMostrarHorarioInput] = useState(false);
    const [horariosOcupados, setHorariosOcupados] = useState([]);
    const [cueData, setCueData] = useState([]);
    const [filteredCueData, setFilteredCueData] = useState([]);

    useEffect(() => {
        fetchCueData();
    }, []);
    
    const fetchCueData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/cue');
            setCueData(response.data);
            setFilteredCueData(response.data);
        } catch (error) {
            console.error('Error fetching CUE data:', error);
        }
    };

    const normalizeString = (str) => {
        return str
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
            .replace(/[^a-z0-9\s]/g, '') // Remove special characters
            .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
            .trim(); // Remove leading and trailing spaces
    };

    const handleCueInputChange = (event, value) => {
        const inputCue = value;
        const filtered = cueData.filter(item =>{
            const normalizedNombreEscuela = normalizeString(item.nombre_escuela);
            const normalizedCue = normalizeString(item.id_cue);
            const normalizedLocalidad = normalizeString(item.localidad);
            
            return normalizedNombreEscuela.includes(inputCue) ||
                   normalizedCue.includes(inputCue) ||
                   normalizedLocalidad.includes(inputCue);
        });
        setFilteredCueData(filtered);
        setFormData(prev => ({ ...prev, cue: value }));
    };

    const handleCueSelect = (event, value) => {
        if (value) {
            setFormData(prev => ({
                ...prev,
                cue: value.id_cue,
                nombreEscuela: value.nombre_escuela,
                localidadEscuela: value.localidad
            }));
        }
    };


    
    const validarCampo = (name, value) => {
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
        const error = validarCampo(name, value);
        setErrores(prev => ({ ...prev, [name]: error }));
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = async (date) => {
        const formattedDate = new Intl.DateTimeFormat('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);
        setFormData(prev => ({ ...prev, fechaVisita: formattedDate }));
        try {
            const response = await axios.get(`http://localhost:3000/horarios/ocupados?fechaVisita=${formattedDate}`);
            setHorariosOcupados(response.data.ocupados);
        } catch (error) {
            console.error('Error al trear los horarios ocupados:', error);
        }
        setHorarioOpen(true);
    };

    const handleHorarioChange = (horario) => {
        setFormData(prev => ({ ...prev, horario }));
        setMostrarHorarioInput(true);
        setHorarioOpen(false);
    };

    const handleHorarioInputClick = () => {
        formData.fechaVisita ? setHorarioOpen(true) : setCalendarioOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        if (!formData.horario) {
            alert('Por favor, seleccione un horario');
            return;
        }

        const formErrores = Object.keys(formData).reduce((acc, key) => {

            const error = validarCampo(key, formData[key]);
            if (error) acc[key] = error;
            return acc;
        }, {});

        if (Object.keys(formErrores).length > 0) {
            setErrores(formErrores);
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
            setMostrarHorarioInput(false);
            setErrores({});
        } catch (error) {
            console.error('Error al enviar el formulario', error);
            alert('Error al cargar. Por favor, intente nuevamente.');
        }
    };

    return (
        <Box component="form"  onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1 } }}>
            <Autocomplete
                options={filteredCueData}
                getOptionLabel={(option) => `${option.id_cue} - ${option.nombre_escuela}`}
                renderInput={(params) => <TextField {...params} label="CUE" variant="outlined" fullWidth />}
                onInputChange={handleCueInputChange}
                onChange={handleCueSelect}
                isOptionEqualToValue={(option, value) => option.id_cue === value.id_cue}
                renderOption={(props, option) => (
                    <li {...props}>
                        <div>{option.id_cue} - {option.nombre_escuela}</div>
                        <div style={{fontSize: '0.8em', color: 'gray'}}>{option.localidad}</div>
                    </li>
                )}
            />
            <TextField
                label="Nombre de la Escuela"
                variant="outlined"
                fullWidth
                name="nombreEscuela"
                value={formData.nombreEscuela}
                onChange={handleChange}
                InputProps={{
                    readOnly: true,
                }}
                required
            />
            <TextField
                label="Localidad de la Escuela"
                variant="outlined"
                fullWidth
                name="localidadEscuela"
                value={formData.localidadEscuela}
                onChange={handleChange}
                InputProps={{
                    readOnly: true,
                }}
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
                error={!!errores.cantAlumnos}
                helperText={errores.cantAlumnos}
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
                error={!!errores.telefono}
                helperText={errores.telefono}
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
                error={!!errores.email}
                helperText={errores.email}
                required
            />
            <TextField 
                label="Fecha de la Visita"
                variant="outlined"
                fullWidth
                name="fechaVisita"
                value={formData.fechaVisita}
                onClick={() => setCalendarioOpen(true)}
                InputProps={{
                    readOnly: true,
                }}
                required
            />
            
            {mostrarHorarioInput && (
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

            <Box sx={{ display: 'flex', justifyContent: 'left', mt: 2 }}>
                <FormControlLabel required control={<Checkbox />} label="Acepto las condiciones" />
            </Box>


            <Box sx={{ display: 'flex', justifyContent: 'right', mt: 2 }}>
                <PdfDownloadComponent 
                    pdfUrl={pdf}
                    fileName="formulario.pdf"
                />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button variant="contained" color="primary" type="submit" sx={{ width: '120px' }} endIcon={<SendIcon />}>
                    Enviar
                </Button>
            </Box>

            <Calendario
                open={calendarioOpen}
                onClose={() => setCalendarioOpen(false)}
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