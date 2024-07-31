import db from "../db/conexion.js";


export async function PostTurnoDocente(request) {
    const data = request.body;
    console.log(data)
    const campos = "nombre_docente, escuela, dni, email, telefono, taller_titulo, taller_fecha"
    await db.execute("INSERT INTO inscripciones_docente ("+campos+") VALUES (?, ?, ?, ?, ?, ?,?)", 
        [data.nombreApellido, data.escuela, data.dni, data.email, data.telefono, data.tallerTitulo, data.tallerFecha]);
}

export async function getDocenteData() {
    try {
        const [rows] = await db.execute("SELECT * FROM talleres_docentes");
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