const express = require('express');
const RotasPrivadas = require('./routes/RotasPrivadas');
// const RotasPublicas = require('./rotas/RotasPublicas');

const app = express();
app.use(express.json());

// Rotas que QUALQUER UM pode acessar (ex: Login)
// app.use(RotasPublicas);

// Rotas que SÓ QUEM TEM TOKEN pode acessar
app.use(RotasPrivadas); 

module.exports = app;