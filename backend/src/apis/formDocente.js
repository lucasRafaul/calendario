import db from "../db/conexion.js";

export async function checkDocenteExists() {
    try {
        const [rows] = await db.execute("SELECT COUNT(*) AS count FROM docente WHERE id = 1");
        return rows[0].count > 0; // Return true if the docente course exists
    } catch (error) {
        console.error('Error checking docente existence:', error);
        throw new Error('Error checking docente existence');
    }
}

export async function PostTurnoDocente(request) {
    const data = request.body;
    console.log(data)
    const campos = "nom_apellido, escuela, dni, email, telefono"
    await db.execute("INSERT INTO inscripciones_docente ("+campos+") VALUES (?, ?, ?, ?, ?)", 
        [data.nombreApellido, data.escuela, data.dni, data.email, data.telefono]);
}