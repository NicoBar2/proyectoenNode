const express = require('express');
const app = express();
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

app.get('/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuarios', (err, result) => {
    if (err) {
      console.error('Error al obtener los usuarios: ', err);
      res.status(500).json({ error: 'Error al obtener los usuarios' });
      return;
    }
    res.json(result);
  });
});

app.get('/direcciones', (req, res) => {
  connection.query('SELECT * FROM direcciones', (err, result) => {
    if (err) {
      console.error('Error al obtener las direcciones: ', err);
      res.status(500).json({ error: 'Error al obtener las direcciones' });
      return;
    }
    res.json(result);
  });
});

app.listen(4000, () => {
  console.log('Servidor iniciado en el puerto 4000');
});
