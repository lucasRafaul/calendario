import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { es } from 'date-fns/locale';
import Horario from './Horario';
import axios from 'axios';

const CalendarDate = ({ open, onClose, onDateClick, onHorarioChange }) => {
    const [horarioOpen, setHorarioOpen] = useState(false);
    const [horariosOcupados, setHorariosOcupados] = useState([]);

    const handleDateClick = async (date) => {
        onDateClick(date);
        onClose();
        const formattedDate = date.toLocaleDateString('es-ES');
        //llamada al backend
        // si = 0 
        try {
            const response = await axios.get(`http://localhost:3000/horarios/ocupados?fechaVisita=${formattedDate}`);
            setHorariosOcupados(response.data.ocupados);
        } catch (error) {
            console.error('Error fetching occupied horarios:', error);
        }

        setHorarioOpen(true);
    };

    const handleHorarioClose = () => {
        setHorarioOpen(false);
    };

    const tileDisabled = ({ date, view }) => {
        if (view === 'month') {
            return date < new Date().setHours(0, 0, 0, 0);
        }
        return false;
    };

    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Seleccione una Fecha</DialogTitle>
                <DialogContent>
                    <Calendar onClickDay={handleDateClick} locale='es' tileDisabled={tileDisabled} />
                </DialogContent>
            </Dialog>
            <Horario open={horarioOpen} onClose={handleHorarioClose} onHorarioChange={onHorarioChange} horariosOcupados={horariosOcupados}/>
        </div>
    );
};

export default CalendarDate;
