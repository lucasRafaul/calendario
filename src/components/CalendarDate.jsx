import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { es } from 'date-fns/locale';
import Horario from './Horario';

const CalendarDate = ({ open, onClose, onDateClick }) => {

  const [horarioOpen, setHorarioOpen] = useState(false);

  const handleDateClick = (date) => {
    onDateClick(date);
    onClose();
    setHorarioOpen(true);
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
        <Calendar onClickDay={handleDateClick} locale='es'  tileDisabled={tileDisabled}/>
      </DialogContent>
    </Dialog>
   { horarioOpen && <Horario/>} 
    </div>
  );
};

export default CalendarDate;
