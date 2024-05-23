import React, { useState } from 'react';
import { Button, Container } from '@mui/material';
import CalendarModal from './components/CalendarModal';
import HorarioForm from './components/HorarioForm';
import FormModal from './components/FormModal'
import './App.css';

function App() {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [horarioFormOpen, setHorarioFormOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHorario, setSelectedHorario] = useState(null)
  const [currentForm, setCurrentForm] = useState(null);

  const handleCalendarOpen = (form) => {
    setCurrentForm(form);
    setCalendarOpen(true);
  };

  const handleCalendarClose = () => setCalendarOpen(false);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setCalendarOpen(false);
    setHorarioFormOpen(true);
  };

  const handleHorarioFormClose = () => setHorarioFormOpen(false);

  const handleTimeSlotConfirm = (slot, time) => {
    const selectedHorario = `${slot === 'mañana' ? 'Mañana' : 'Tarde'} - ${time}`;
    setSelectedHorario(selectedHorario);
    setHorarioFormOpen(false);
    if (currentForm === 'institucion') {
      // handle opening institution form here, if needed
      setFormModalOpen(true)
    } else if (currentForm === 'particular') {
      // handle opening particular form here, if needed
    }
    alert('Horario Confirmado'); // This is just a placeholder
  };

  const handleFormModalClose = () => setFormModalOpen(false);

  return (
    <Container className='AppDiv'>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleCalendarOpen('institucion')}
      >
        Inscripción Instituciones
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleCalendarOpen('particular')}
        style={{ marginLeft: '10px' }}
      >
        Inscripción Particulares
      </Button>
      <CalendarModal
        open={calendarOpen}
        onClose={handleCalendarClose}
        onDateClick={handleDateClick}
      />
      <HorarioForm
        open={horarioFormOpen}
        onClose={handleHorarioFormClose}
        selectedDate={selectedDate}
        onConfirm={handleTimeSlotConfirm}
      />
      <FormModal
      open={formModalOpen}
      onClose={handleFormModalClose}
      selectedDate={selectedDate}
      selectedHorario={selectedHorario}
      />
    </Container>
  );
}

export default App;


