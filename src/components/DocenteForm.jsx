import React, { useState } from 'react';

const DocenteForm = () =>{
    const [formData, setFormData] = useState({
        nombreApellido: 'prueba',
        escuela:'',
        dni: '',
        email:'',
        telefono:'3624060290',
    
    })

return (
    <div>
    <h1>hola! {formData.nombreApellido}</h1>
    <p>tu numero de telefono es el siguiente: {formData.telefono}</p>
    </div>

)
}

export default DocenteForm;