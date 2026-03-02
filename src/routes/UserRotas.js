const express = require('express');
// Importamos a CLASSE do arquivo (recomendo usar U maiúsculo para classes)
const UserController = require('../controllers/UserController'); 
const UsuarioRotas = express.Router();

// Agora criamos a INSTÂNCIA usando o nome exato da variável acima
const userController = new UserController();

// CRUD
UsuarioRotas.get('/users', userController.listar); 
UsuarioRotas.post('/users', userController.criar);

module.exports = UsuarioRotas;