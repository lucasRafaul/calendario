import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

// Componente Horario para seleccionar un horario disponible
const Horario = ({ open, onClose, onHorarioChange, horariosOcupados }) => {

    // useStates para manejar los horarios y el horario seleccionado
    const [horarios, setHorarios] = useState([]);   
    const [selectedHorario, setSelectedHorario] = useState('');

    // Función para obtener los horarios del servidor
    async function fetchHorarios() {
        try {
            const response = await axios.get('http://localhost:3000/get_horarios');
            setHorarios(response.data);
        } catch (error) {
            console.error('Error fetching horarios:', error);
            // Aquí se podría manejar el error, por ejemplo, mostrando un mensaje al usuario
        }
    }

    // useEffect para cargar los horarios al montar el componente
    useEffect(() => {
        fetchHorarios();
    }, []);
    
    // Controlador para el cambio en la selección de horario
    const handleChange = (e) => {
        setSelectedHorario(e.target.value);
    };

    // Controlador para confirmar la selección del horario
    const handleSelectHorario = () => {
        onHorarioChange(selectedHorario);
        onClose();
    };

    // Filtrar los horarios disponibles
    const horariosDisponibles = horarios.filter(horario => !horariosOcupados.includes(horario.id));

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Seleccione un Horario</DialogTitle>
            <DialogContent>
            {horariosDisponibles.length > 0 ? (
                    // Selector de horarios si hay disponibles
                    <>
                        <select
                            name="horarios"
                            id="horariosId"
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '16px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                backgroundColor: '#f9f9f9',
                                marginBottom: '20px',
                            }}
                        >
                            {horariosDisponibles.map(horario => (
                                <option key={horario.id} value={horario.id} style={{ padding: '10px' }}>
                                    {horario.descr}
                                </option>
                            ))}
                        </select>
                        <DialogActions>
                            <Button onClick={handleSelectHorario} color="primary" disabled={!selectedHorario}>
                                Enviar
                            </Button>
                        </DialogActions>
                    </>
                ) : (
                    // Mensaje si no hay horarios disponibles
                    <Typography variant="body1" color="error" align="center">
                        No hay horarios disponibles para esta fecha.
                    </Typography>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default Horario;
