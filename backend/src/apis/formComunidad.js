import db from "../db/conexion.js";

export async function PostTurnoComunidad(request) {
    const data = request.body;
    console.log(data)
    const campos = "nom_apellido, edad, fe_nacimiento, nom_apellido_tutor, telefono, email, taller_id"
    await db.execute("INSERT INTO inscripciones_comunidad ("+campos+") VALUES (?, ?, ?, ?, ?, ?, ?)", 
        [data.nombreApellido, data.edad, data.fechaNacimiento, data.nombreApellidoTutor, data.telefono, data.email, data.tallerId]);
}

export async function getComunidadData() {
    try {
        const [rows] = await db.execute("SELECT * FROM comunidad");
        if (rows.length > 0) {
            return rows;
        } else {
            throw new Error('No comunidad found with id 1');
        }
    } catch (error) {
        console.error('Error fetching comunidad data:', error);
        throw new Error('Error fetching comunidad data');
    }
}