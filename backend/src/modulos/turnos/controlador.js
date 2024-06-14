const TABLA = 'turno_instituto';
const autenticacion = require('../../autenticacion');
module.exports = function (dbInyectada){  

    let db = dbInyectada;

    if(!db){
        db = require('../../DB/mysql.js');
    }
    
    const agregarTurno = async (data) => {
      try {
          await db.query('INSERT INTO turno_instituto SET ? ON DUPLICATE KEY UPDATE ?', [data, data]);
          return { success: true, message: 'Turno saved successfully' };
      } catch (error) {
          throw new Error('Error saving turno: ' + error.message);
      }
  };
      
      // Function to get bookings by date
      const getTurnosPorFecha = async (fechaVisita,horario) => {
        try {
            const results = await db.query('SELECT * FROM turno_instituto WHERE fecha_visita = ? && horario = ?', [fechaVisita,horario]);
            return results;
        } catch (error) {
            throw new Error('Error trayendo los turnos: ' + error.message);
        }
    };
      return {
        agregarTurno, getTurnosPorFecha
    }
}