const express = require('express') // importando o express
const jwt = require('jsonwebtoken') // importando jsonwebtoken
require('dotenv').config() // importando o .env
const AuthController = require('../controllers/AuthController'); // importando o authcontroller

const RotasPublicas = express.Router() // criando rota com o express

RotasPublicas.post('/login', async (request,response) => {
    try{
        const body = request.body;
        const auth = new AuthController();
        const dados = await auth.login(body.username, body.password);
        if(dados) {
            // configurada para expirar em 1h
            const dataToken={
                id: dados.id,
                email: dados.email,
                username: dados.username
            }

            const token = jwt.sign(dataToken, process.env.APP_KEY_TOKEN,{
                expiresIn: process.env.APP_TEMP,
            })

            return response.json({
                message: "Login realizado com sucesso",
                data: dados,
                token: token
            })
        }
        
        return response.json({
            message: "Login ou senha incorreto"
        })

    }catch(error){
        return response.status(500).json({
            message: "Erro interno no servidor",
            error: error.message
        });
    }

})    // criando autenticação

module.exports = RotasPublicas; // expostando o AuthRotas
