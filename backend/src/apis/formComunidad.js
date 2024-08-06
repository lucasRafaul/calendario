import db from "../db/conexion.js";

export async function PostTurnoComunidad(request) {
    const data = request.body;
    console.log(data)
    const campos = "nombre_alumno, edad, fecha_nacimiento, nombre_tutor, telefono_tutor, email, taller_titulo, taller_fecha"
    await db.execute("INSERT INTO inscripciones_comunidad ("+campos+") VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
        [data.nombreApellido, data.edad, data.fechaNacimiento, data.nombreApellidoTutor, data.telefono, data.email, data.tallerTitulo, data.tallerFecha]);
}

export async function getComunidadData() {
    try {
        const [rows] = await db.execute("SELECT * FROM talleres_comunidad");
        if (rows.length > 0) {
            return rows;
        } else {
            throw new Error('No se encontraron talleres comunidad');
        }
    } catch (error) {
        console.error('Error fetching comunidad data:', error);
        throw new Error('Error fetching comunidad data');
    }
}