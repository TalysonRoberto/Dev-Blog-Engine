const express = require('express');
const PostsController = require('../controllers/PostsController'); 
const PostRotas = express.Router();

// Agora criamos a INSTÂNCIA usando o nome exato da variável acima
const postsController = new PostsController();

// CRUD
PostRotas.get('/posts', postsController.listar);         // lista posts
PostRotas.get('/posts/:id', postsController.consultarPorId);  // buscar post por id
PostRotas.post('/posts', postsController.criar);         // Cria post
PostRotas.put('/posts/:id', postsController.atualizar);   // atualiza post por id
PostRotas.delete('/posts/:id', postsController.deletar); // deleta deleta por id

module.exports = PostRotas;