const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./public/db/database.db', (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite.');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      apellido TEXT,
      numero TEXT,
      correo TEXT,
      fecha_nacimiento TEXT
    )
  `, (err) => {
    if (err) {
      console.error('Error al crear la tabla:', err.message);
    } else {
      console.log('Tabla de usuarios creada o ya existente.');
    }
  });
});

module.exports = db;