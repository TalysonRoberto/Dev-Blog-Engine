const express = require('express');
const CommentsController = require('../controllers/CommentsController'); 
const CommentsRotas = express.Router();

// tem que ser minusculo
const commentsController = new CommentsController();

// CRUD
CommentsRotas.get('/comments', commentsController.listar);         // lista comments
CommentsRotas.post('/comments', commentsController.criar);         // Cria comments
// CommentsRotas.put('/comments/:id', PostController.criar);       // atualiza comments por id
// CommentsRotas.delet('/comments/:id', PostController.criar);     // deleta comments por id

module.exports = CommentsRotas;