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
  
 export const Escuela = await GetEscuela()
