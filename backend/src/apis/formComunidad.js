import db from "../db/conexion.js";

export async function checkComunidadExists() {
    try {
        const [rows] = await db.execute("SELECT COUNT(*) AS count FROM comunidad WHERE id = 1");
        return rows[0].count > 0; // Return true if the comunidad course exists
    } catch (error) {
        console.error('Error checking comunidad existence:', error);
        throw new Error('Error checking comunidad existence');
    }
}


export async function PostTurnoComunidad(request) {
    const data = request.body;
    console.log(data)
    const campos = "nom_apellido, edad, fe_nacimiento, nom_apellido_tutor, telefono, email"
    await db.execute("INSERT INTO inscripciones_comunidad ("+campos+") VALUES (?, ?, ?, ?, ?, ?)", 
        [data.nombreApellido, data.edad, data.fechaNacimiento, data.nombreApellidoTutor, data.telefono, data.email]);
}