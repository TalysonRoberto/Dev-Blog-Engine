const express = require('express');
const jwt = require('jsonwebtoken');
const RotasPrivadas = express.Router();

// Importe as rotas que você quer proteger
const TagsRotas = require('./TagsRotas');
// const UsuariosRotas = require('./UsuarioRotas');

// MIDDLEWARE DE AUTENTICAÇÃO
RotasPrivadas.use((request, response, next) => {
    let auth = false;

    // 1. Verifica se o token foi enviado no cabeçalho
    const token = request.headers.token;

    if (token) {
        try {
            // 2. Tenta validar o token usando sua chave secreta
            // process.env.APP_KEY_TOKEN deve estar no seu arquivo .env
            jwt.verify(token, process.env.APP_KEY_TOKEN);
            auth = true;
        } catch (e) {
            auth = false;
        }
    }

    // 3. Decisão do "Segurança"
    if (auth) {
        next(); // Token ok! Pode seguir para a rota desejada.
    } else {
        return response.status(401).json({
            message: "Acesso negado. Token inválido ou ausente."
        });
    }
});

// 4. Todas as rotas abaixo deste middleware agora são PRIVADAS
RotasPrivadas.use(TagsRotas);
// RotasPrivadas.use(UsuariosRotas);

module.exports = RotasPrivadas;