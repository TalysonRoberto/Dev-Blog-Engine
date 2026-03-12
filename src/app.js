const express = require('express');
const RotasPrivadas = require('./routes/RotasPrivadas');
const RotasPublicas = require('./routes/RotasPublicas');
// const RotasPublicas = require('./rotas/RotasPublicas');

const app = express();
app.use(express.json());

// Rotas publicas
app.use(RotasPublicas); 

// Rotas privadas
app.use(RotasPrivadas); 



module.exports = app;