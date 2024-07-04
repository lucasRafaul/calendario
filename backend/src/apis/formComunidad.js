import db from "../db/conexion.js";

export async function checkComunidadExists() {
    try {
        const [rows] = await db.execute("SELECT COUNT(*) AS count FROM comunidad WHERE id = 1");
        return rows[0].count > 0; 
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

export async function getComunidadData() {
    try {
        const [rows] = await db.execute("SELECT titulo, imagen, fecha FROM comunidad WHERE id = 1");
        if (rows.length > 0) {
            return rows[0];
        } else {
            throw new Error('No comunidad found with id 1');
        }
    } catch (error) {
        console.error('Error fetching comunidad data:', error);
        throw new Error('Error fetching comunidad data');
    }
}