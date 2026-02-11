const express = require('express');
const TagsRotas = express.Router();
const TagsController = require('../controllers/TagsController'); // Verifique se o nome do arquivo está certo

// Criando a instância da classe
const controller = new TagsController();

// Verifique se os nomes dos métodos (listar, criar) 
// batem exatamente com o que você escreveu no arquivo do Controller
TagsRotas.get('/tags', controller.listar); 
TagsRotas.post('/tags', controller.criar);

module.exports = TagsRotas;