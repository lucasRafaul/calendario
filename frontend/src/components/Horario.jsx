import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const Horario = ({ open, onClose, onHorarioChange }) => {
    const [selectedHorario, setSelectedHorario] = useState('');

    const handleChange = (e) => {
        setSelectedHorario(e.target.value);
    };

    const handleSelectHorario = () => {
        onHorarioChange(selectedHorario);
        onClose();
    };


    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Seleccione un Horario</DialogTitle>
            <DialogContent>
                <select name="horarios" id="horariosId" onChange={handleChange}>
                    <option value="08:00-10:00">08:00-10:00</option>
                    <option value="10:00-12:00">10:00-12:00</option>
                    <option value="12:00-14:00">12:00-14:00</option>
                    <option value="14:00-16:00">14:00-16:00</option>
                </select>

            </DialogContent>
            <DialogActions>
            <Button onClick={handleSelectHorario} color="primary">
                    Enviar
                </Button>
            </DialogActions>

        </Dialog>
    );
};

export default Horario;

