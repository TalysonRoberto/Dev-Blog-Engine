const app = require('./src/app');
const connection = require('./src/config/connection');
require('dotenv').config(); // Isso deve vir antes de tudo!

const PORT = process.env.PORT || 3000;

// Gerando token de teste com a chave real do seu .env
const jwt = require('jsonwebtoken');
const token = jwt.sign({ id: 1 }, process.env.APP_KEY_TOKEN); 
console.log("-----------------------------------------");
console.log("🎫 SEU TOKEN DE TESTE (COPIE ISTO):");
console.log(token);
console.log("-----------------------------------------");

async function startServer() {
    try {
        await connection.authenticate();
        console.log('✅ Conexão com o banco de dados estabelecida!');
        await connection.sync({ alter: true }); 
        
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Erro ao conectar no banco:', error);
    }
}

startServer();