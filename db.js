const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: '',
  password: '',
  database: 'basedatos'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos: ', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

connection.query(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) {
    console.error('Error al crear la tabla "usuarios": ', err);
    return;
  }
  console.log('Tabla "usuarios" creada exitosamente');
});

connection.query(`
  CREATE TABLE IF NOT EXISTS direcciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    ciudad VARCHAR(50) NOT NULL,
    codigo_postal VARCHAR(10) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  )
`, (err) => {
  if (err) {
    console.error('Error al crear la tabla "direcciones": ', err);
    return;
  }
  console.log('Tabla "direcciones" creada exitosamente');
});

module.exports = connection;
