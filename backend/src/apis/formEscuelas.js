import db from "../db/conexion.js";

export async function PostTurno(request) {
    const data = request.body;
    console.log(data)
    const campos = "cue, nombre_escuela, localidad_escuela, nombre_director, grado_escuela, turno, cantidad_alumnos, telefono, email,fecha, horario"
    await db.execute("INSERT INTO escuelas ("+campos+") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [data.cue, data.nombreEscuela, data.localidadEscuela, data.nombreDirector, data.grado, data.turno, data.cantAlumnos, data.telefono, data.email, data.fechaVisita, data.horario]);
}

async function GetEscuela() {
    const [row] = await db.execute("SELECT * FROM escuelas");
    return row
}

async function GetHorarios() {
    const horarios = [
        { id: 'manana_1', descr: 'Mañana 1' },
        { id: 'manana_2', descr: 'Mañana 2' },
        { id: 'tarde_1', descr: 'Tarde 1' },
        { id: 'tarde_2', descr: 'Tarde 2' },
    ];
    return horarios;
}

export async function horarioDisponible(id, fechaVisita) {
    try {
        const [rows] = await db.execute(
            "SELECT COUNT(*) AS count FROM escuelas WHERE horario = ? AND fecha = ?",
            [id, fechaVisita]
        );

        const count = rows[0].count;
        return count === 0; 
    } catch (error) {
        console.error('Error al chequear la disponibilidad del horario:', error);
        throw new Error('Error al chequear la disponibilidad del horario');
    }
}

export async function getHorariosOcupados(fechaVisita){
    try{
        const [rows] = await db.execute("SELECT horario FROM escuelas WHERE fecha = ? ", [fechaVisita]);
        return rows.map(row => row.horario)
    }
    catch(error){
        console.error('error al cargar los horarios ocupados en la fecha: ', error);
        throw new Error('Error al cargar los horarios ocupados')
    }
}

export async function getFechasOcupadas() {
    try {
        const [rows] = await db.execute("SELECT fecha FROM escuelas GROUP BY fecha HAVING COUNT(DISTINCT horario) >=4")
        return rows.map(row => row.fecha)
    } catch(error) {
        console.error('Error al cargar las fechas sin horarios: ', error);
        throw new Error('Error al cargar las fechas sin horarios');
    }
}

export async function getCue() {
    try {
        const [rows] = await db.execute("SELECT * FROM bdcue");
        return rows;
    } catch (error) {
        console.error('Error fetching CUE data:', error);
        throw new Error('Error fetching CUE data');
    }
}



 export const Escuela = await GetEscuela()
 export const Horarios = await GetHorarios()
 export const Cue = await getCue()
