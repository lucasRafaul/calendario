import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarDate.css';
import { es } from 'date-fns/locale';
import Horario from './Horario';
import axios from 'axios';

// Componente CalendarDate para seleccionar una fecha y horario
const CalendarDate = ({ open, onClose, onDateClick, onHorarioChange }) => {
    // useStates para controlar la apertura del Modal de horarios y los horarios ocupados
    const [horarioOpen, setHorarioOpen] = useState(false);
    const [horariosOcupados, setHorariosOcupados] = useState([]);
    const [fechasSinHorarios, setFechasSinHorarios] = useState([]);


    useEffect(() => {
        const fetchFechasSinHorarios = async () => {
          try {
            const response = await axios.get('http://localhost:3000/fechas-sin-horarios');
            console.log('Backend response', response.data);
            const fechas = response.data.fechasSinHorarios.map(date => date.toString());
            setFechasSinHorarios(fechas);
          } catch (error) {
            console.error('Error fetching fechas sin horarios:', error);
          }
        };
        fetchFechasSinHorarios();
      }, []);

    // Controlador para cuando se selecciona una fecha
    const handleDateClick = async (date) => {
        const diaDeSemana = date.getDay();
        if (diaDeSemana === 0 || diaDeSemana === 6) {
          alert('No atendemos fines de semana');
          return;
        }
        onDateClick(date);
        onClose();
        const formattedDate = date.toLocaleDateString('es-ES');
        
        // Llamada al backend para obtener los horarios ocupados
        try {
            const response = await axios.get(`http://localhost:3000/horarios/ocupados?fechaVisita=${formattedDate}`);
            setHorariosOcupados(response.data.ocupados);
        } catch (error) {
            console.error('Error fetching occupied horarios:', error);
        }

        // Abrir el Modal de selección de horario
        setHorarioOpen(true);
    };

    // Controlador para cerrar el Modal de horarios
    const handleHorarioClose = () => {
        setHorarioOpen(false);
    };

    // Función para deshabilitar fechas pasadas en el calendario
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
        <div>
            {/* Modal para seleccionar la fecha */}
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Seleccione una Fecha</DialogTitle>
                <DialogContent>
                    <Calendar 
                        onClickDay={handleDateClick} 
                        locale='es' 
                        tileDisabled={tileDisabled} 
                        tileClassName={tileClassName}
                    />
                </DialogContent>
            </Dialog>
            {/* Componente Horario para seleccionar el horario */}
            <Horario 
                open={horarioOpen} 
                onClose={handleHorarioClose} 
                onHorarioChange={onHorarioChange} 
                horariosOcupados={horariosOcupados}
            />
        </div>
    );
};

export default CalendarDate;