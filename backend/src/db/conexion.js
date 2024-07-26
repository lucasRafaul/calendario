import mysql from 'mysql2/promise';

let DB = null

try {
   DB = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'conectarlab',
    });
} catch (err) {
    console.log(err);
}

export default DB;