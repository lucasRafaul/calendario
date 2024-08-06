import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendario.css';
import axios from 'axios';

const Calendario = ({ open, onClose, onDateClick, selectedDate }) => {
    const [fechasSinHorarios, setFechasSinHorarios] = useState([]);
    const [diaActual, setDiaActual] = useState(null);

    const fetchFechasSinHorarios = async () => {
        try {
            const response = await axios.get('http://localhost:3000/fechas-sin-horarios');
            console.log(response.data.fechasSinHorarios);
            const fechas = response.data.fechasSinHorarios.map(date => date.toString());
            setFechasSinHorarios(fechas);
        } catch (error) {
            console.error('Error al traer fechas sin horarios:', error);
        }
    };

    useEffect(() => {
        fetchFechasSinHorarios();
    }, []);

    useEffect(() => {
        if (selectedDate) {
            const [day, month, year] = selectedDate.split('/');
            setDiaActual(new Date(year, month - 1, day));
        }
    }, [selectedDate]);

    const handleDateClick = async (date) => {
        const diaDeSemana = date.getDay();
        if (diaDeSemana === 0 || diaDeSemana === 6) {
            alert('No atendemos fines de semana');
            return;
        }
        setDiaActual(date);
        onDateClick(date);
        onClose();
    };

    const tileDisabled = ({ date, view }) => {
        if (view === 'month') {
            return date < new Date().setHours(0, 0, 0, 0);
        }
        return false;
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (date < today) {
                return '';  
            }

            const formattedDate = new Intl.DateTimeFormat('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).format(date);
            if (fechasSinHorarios.includes(formattedDate)) {
                return 'no-horarios';
            }
        }
        return '';
    };

    return (
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Seleccione una Fecha</DialogTitle>
                <DialogContent>
                    <Calendar 
                        onClickDay={handleDateClick} 
                        locale='es' 
                        tileDisabled={tileDisabled} 
                        tileClassName={tileClassName}
                        value={diaActual}
                    />
                </DialogContent>
            </Dialog>
    );
};

export default Calendario;