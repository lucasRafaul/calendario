import db from "../db/conexion.js";

export async function PostTurno(request) {
    const data = request.body;
    console.log(data)
    const campos = "cue, nom_escuela, nom_localidad, nom_director, grado, turno, cant_alu, telefono, email,fe_visita, horario"
    await db.execute("INSERT INTO escuela ("+campos+") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [data.cue, data.nombreEscuela, data.localidadEscuela, data.nombreDirector, data.grado, data.turno, data.cantAlumnos, data.telefono, data.email, data.fechaVisita, data.horario]);
}

async function GetEscuela() {
    const [row] = await db.execute("SELECT * FROM escuela");
    return row
}

async function GetHorarios() {
    const [row] = await db.execute("SELECT id, descr FROM horario WHERE tipo = 'esc'");
    return row
}

export async function horarioDisponible(id, fechaVisita) {
    try {
        const [rows] = await db.execute(
            "SELECT COUNT(*) AS count FROM escuela WHERE horario = ? AND fe_visita = ?",
            [id, fechaVisita]
        );

        const count = rows[0].count;
        return count === 0; // Return true if available, false if not
    } catch (error) {
        console.error('Error checking horario availability:', error);
        throw new Error('Error checking horario availability');
    }
}

export async function getHorariosOcupados(fechaVisita){
    try{
        const [rows] = await db.execute("SELECT horario FROM escuela WHERE fe_visita = ? ", [fechaVisita]);
        return rows.map(row => row.horario)
    }
    catch(error){
        console.error('error al cargar los horarios ocupados en la fecha: ', error);
        throw new Error('Error al cargar los horarios ocupados')
    }
}




 export const Escuela = await GetEscuela()
 export const Horarios = await GetHorarios()
