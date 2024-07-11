import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarDate.css';
import axios from 'axios';

const CalendarDate = ({ open, onClose, onDateClick, selectedDate }) => {
    const [fechasSinHorarios, setFechasSinHorarios] = useState([]);
    const [currentDate, setCurrentDate] = useState(null);

    useEffect(() => {
        const fetchFechasSinHorarios = async () => {
            try {
                const response = await axios.get('http://localhost:3000/fechas-sin-horarios');
                const fechas = response.data.fechasSinHorarios.map(date => date.toString());
                setFechasSinHorarios(fechas);
            } catch (error) {
                console.error('Error fetching fechas sin horarios:', error);
            }
        };
        fetchFechasSinHorarios();
    }, []);

    useEffect(() => {
        if (selectedDate) {
            setCurrentDate(new Date(selectedDate.split('/').reverse().join('-')));
        }
    }, [selectedDate]);

    const handleDateClick = async (date) => {
        const diaDeSemana = date.getDay();
        if (diaDeSemana === 0 || diaDeSemana === 6) {
            alert('No atendemos fines de semana');
            return;
        }
        setCurrentDate(date);
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

            const formattedDate = date.toLocaleDateString('es-ES');
            if (fechasSinHorarios.includes(formattedDate)) {
                return 'no-horarios-day';
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
                        value={currentDate}
                    />
                </DialogContent>
            </Dialog>
    );
};

export default CalendarDate;