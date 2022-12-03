// const express = require('express'); |--> Importamos Express (Common.Js version).
import express from 'express'; //--> Importamos Express (Import version).
import router from './routes/index.js';
import db from './config/db.js';

const app = express(); //--> Creamos una variable que inicie Express.

//Conectar a la BBDD.
db.authenticate()
  .then(() => console.log('Base de datos conectada'))
  .catch((error) => console.log(error));

//Definimos el puerto.
const port = process.env.PORT || 4000;

//Habilitar PUG.
app.set('view engine', 'pug');

//Obtener el año actual.
app.use((req, res, next) => {
  const year = new Date();
  res.locals.actualYear = year.getFullYear();
  res.locals.nombreSitio = 'Agencia de Viajes';
  next();
});

//Agregar body parser para leer los datos del formulario.
app.use(express.urlencoded({ extended: true }));

//Definir la carpeta pública.
app.use(express.static('public'));

//Añadir Router.
app.use('/', router);

app.listen(port, () => {
  console.log(`El Servidor está funcionando en el puerto ${port}`);
});
