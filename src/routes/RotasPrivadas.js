const express = require('express');
const jwt = require('jsonwebtoken');
const RotasPrivadas = express.Router();

// Importe as rotas que você quer proteger
const TagsRotas = require('./TagsRotas');
const UserRotas = require('./UserRotas');
const PostRotas = require('./PostRotas');
const CommentsRotas = require('./CommentsRotas');
// ---------- ADD NEW --------------

// MIDDLEWARE DE AUTENTICAÇÃO
RotasPrivadas.use((request, response, next) => {
    let logged = false;
    // Verifica se tem autorização
    const token = request.headers.token; // PEGANDO O TOKEN PASSADO
    try{
        jwt.verify(token, process.env.APP_KEY_TOKEN) // FAZENDO VERIFICAÇÃO DE AUTENTIFICAÇÃO
        logged = true
    }catch(JsonWebTokenError){
        logged = false
    }

    if(logged === false){
        return response.status(403).send("Não Autorizado")
    }
    next();
});

// 4. Todas as rotas abaixo deste middleware agora são PRIVADAS
RotasPrivadas.use(TagsRotas);
RotasPrivadas.use(UserRotas);
RotasPrivadas.use(PostRotas);
RotasPrivadas.use(CommentsRotas);
// ---------- ADD NEW --------------


module.exports = RotasPrivadas;