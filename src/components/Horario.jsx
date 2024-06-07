import { useState } from "react";

export default function Horario({ onHorarioChange }) {
    const [maxTurnos, setMaxTurnos] = useState(25);

    const handleChange = (e) => {
        onHorarioChange(e.target.value);
    };

    return (
        <div>
            <select name="horarios" id="horariosId" onChange={handleChange}>
                <option value="08:00-10:00">08:00-10:00</option>
                <option value="10:00-12:00">10:00-12:00</option>
                <hr />
                <option value="12:00-14:00">12:00-14:00</option>
                <option value="14:00-16:00">14:00-16:00</option>
            </select>
        </div>
    );
}

