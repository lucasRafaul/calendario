import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axios from 'axios';

const Horario = ({ open, onClose, onHorarioChange, horariosOcupados }) => {

    const [horarios, setHorarios] = useState([]);
    const [selectedHorario, setSelectedHorario] = useState('');

  
    async function fetchHorarios() {
        try {
            const response = await axios.get('http://localhost:3000/get_horarios'); // Adjust URL as per your backend setup
            setHorarios(response.data); // Assuming response.data is an array of { id, descr }
        } catch (error) {
            console.error('Error fetching horarios:', error);
            // Handle error fetching data
        }
    }


    useEffect(() => {
        fetchHorarios();
    }, []);
    

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
                <select name="horarios" id="horariosId" onChange={handleChange} style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9',
                    marginBottom: '20px',
                }}> 
                    {horarios.filter(horario => !horariosOcupados.includes(horario.id)).map(horario => (
                        <option key={horario.id} value={horario.id} style={{padding:'10px'}}>
                            {horario.descr}
                        </option>
                    ))}
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

