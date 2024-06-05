import { useState } from "react"

export default function Horario() {

    const [turno1, setTurno1] = useState(25)
  return (
    <div>
        <select name="horarios" id="horarios">
        <option value="1" >08:00-10:00 </option>
        <option value="2">10:00-12:00</option>
        <hr />
        <option value="3">12:00-14:00</option>
        <option value="4">14:00-16:00</option>
        </select>
    </div>
  )
}