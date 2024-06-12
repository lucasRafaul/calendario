const TABLA = 'turno_instituto';
const autenticacion = require('../../autenticacion');
module.exports = function (dbInyectada){

    let db = dbInyectada;

    if(!db){
        db = require('../../DB/mysql.js');
    }
    s
    const agregarTurno = async (data) => {
        try {
          await db.agregar(TABLA, data);
          return { success: true, message: 'Turno saved successfully' };
        } catch (error) {
          throw new Error('Error saving turno: ' + error.message);
        }
      };
      
      // Function to get bookings by date
      const getTurnosPorFecha = async (fechaVisita) => {
        try {
          const results = await db.query(TABLA, { fechaVisita });
          console.log('Results from DB:', results); // Log the results from DB
          return results;
        } catch (error) {
          throw new Error('Error trayendo los turnos: ' + error.message);
        }
      };
      return {
        agregarTurno, getTurnosPorFecha,
    }
}