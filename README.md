# 🚀 Blog API - Node.js & Sequelize

Este é um projeto de backend robusto, desenvolvido para aprender o fluxo completo de uma **API RESTful** profissional. Evoluímos de uma estrutura simples para uma arquitetura **MVC** com banco de dados **MySQL** e segurança via **JWT**.

## 📋 Sobre o Projeto
A API permite o gerenciamento de Tags e usuários, utilizando o **Sequelize** como ORM para facilitar a comunicação com o banco de dados e um sistema de **Middleware** para proteção de rotas sensíveis.

## 🛠️ Tecnologias Utilizadas
* **Node.js**: Ambiente de execução.
* **Express**: Framework para gerenciamento de rotas.
* **Sequelize**: ORM para persistência de dados no MySQL.
* **JSONWebToken (JWT)**: Protocolo para autenticação e segurança.
* **Dotenv**: Proteção de dados sensíveis (senhas e chaves).
* **Nodemon**: Reinicialização automática do servidor em desenvolvimento.

## 📁 Estrutura de Pastas
```text
├── src/
│   ├── config/
│   │   └── connection.js    # Configuração do Sequelize e Banco de Dados
│   ├── controllers/
│   │   └── TagsController.js # Lógica das requisições e respostas
│   ├── database/
│   │   └── syncforce.js     # Script para sincronização de tabelas
│   ├── models/
│   │   ├── TagsModel.js      # Estrutura da tabela de Tags
│   │   └── UserTypesModel.js # Estrutura da tabela de Tipos de Usuário
│   ├── routes/
│   │   ├── RotasPrivadas.js  # Segurança (Middleware) e rotas protegidas
│   │   └── TagsRotas.js      # Definição dos caminhos da API
│   └── app.js                # Configurações do Express
├── .env                      # Variáveis de ambiente (Senhas/Chaves)
├── package.json              # Manifesto do projeto e scripts
└── server.js                 # Ponto de entrada e inicialização
```


## 🚀 Como Executar
 - 1 Clone o projeto e instale as dependências
 
 		Bash: npm install
 - 2 Configure o arquivo `.env` na raiz do projeto:
	```
	PORT=3000
	APP_KEY_TOKEN=sua_chave_secreta_jwt
	DB_USER=root
	DB_PASS=sua_senha_do_banco
	DB_NAME=blog
	```
 - 3 Inicie o servidor em modo de desenvolvimento:
 
 		Bash: npm run dev
		
## 📍 Documentação da API
### Segurança (Auth)
Para acessar as rotas abaixo, você deve incluir o token no cabeçalho da requisição no Insomnia/Postman

KEY: `token`

Value: `<seu_token_jwt>`

| Método | Rotas | Descrição | Nível de Acesso |
| :--- | :--- | :--- | :--- |
| GET | `/tags` | Lista todas as tags cadastradas	| 🔒 Privado (JWT) |
| POST| `/tags`	| Cadastra uma nova tag no banco	| 🔒 Privado (JWT) |
	

## 🚦 Status Codes Comuns

`200 OK`: Sucesso na operação.

`201 Created`: Novo registro criado com sucesso.

`401 Unauthorized`: Token ausente ou inválido.

`404 Not Found`: Recurso não localizado no banco.

## 👤 Autor
Desenvolvido por Talyson_Roberto