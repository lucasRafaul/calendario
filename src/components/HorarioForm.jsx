import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, FormControl, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

const HorarioForm = ({ open, onClose, selectedDate, onConfirm }) => {
  const [slot, setSlot] = useState('mañana');
  const [time, setTime] = useState('');

  const morningSlots = ['8:00 - 10:00', '10:00 - 12:00'];
  const afternoonSlots = ['13:00 - 15:00', '15:00 - 17:00'];

  const handleSlotChange = (event) => {
    setSlot(event.target.value);
    setTime('');
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleConfirm = () => {
    onConfirm(slot, time);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Seleccione Horario</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <RadioGroup row value={slot} onChange={handleSlotChange}>
            <FormControlLabel value="mañana" control={<Radio />} label="Mañana" />
            <FormControlLabel value="tarde" control={<Radio />} label="Tarde" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset">
          <RadioGroup value={time} onChange={handleTimeChange}>
            {(slot === 'mañana' ? morningSlots : afternoonSlots).map((timeSlot, index) => (
              <FormControlLabel key={index} value={timeSlot} control={<Radio />} label={timeSlot} />
            ))}
          </RadioGroup>
        </FormControl>
        <Button variant="contained" onClick={handleConfirm} disabled={!time}>
          Confirmar
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default HorarioForm;
