import db from "../db/conexion.js";


export async function PostTurnoDocente(request) {
    const data = request.body;
    console.log(data)
    const campos = "nom_apellido, escuela, dni, email, telefono, taller_id"
    await db.execute("INSERT INTO inscripciones_docentes ("+campos+") VALUES (?, ?, ?, ?, ?, ?)", 
        [data.nombreApellido, data.escuela, data.dni, data.email, data.telefono, data.tallerId]);
}

export async function getDocenteData() {
    try {
        const [rows] = await db.execute("SELECT * FROM docente");
        if (rows.length > 0) {
            return rows;
        } else {
            throw new Error('No docente talleres found');
        }
    } catch (error) {
        console.error('Error fetching docente data:', error);
        throw new Error('Error fetching docente data');
    }
}