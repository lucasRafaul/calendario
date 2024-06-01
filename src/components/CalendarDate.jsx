import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { es } from 'date-fns/locale';

const CalendarDate = ({ open, onClose, onDateClick }) => {  //función de flecha que permite tomar la fecha seleccionada por el usuario
  const handleDateClick = (date) => {
    onDateClick(date);
    onClose();
  };
  const tileDisabled = ({ date, view }) => {  //función de flecha que permite desactivar todas las fechas anteriores a hoy
    if (view === 'month') {
      return date < new Date().setHours(0, 0, 0, 0);
    }
    return false;
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Seleccione una Fecha</DialogTitle>
      <DialogContent>
        <Calendar onClickDay={handleDateClick} locale='es'  tileDisabled={tileDisabled}/>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarDate;
