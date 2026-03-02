# 📝 Blog API - Node.js, Express & Sequelize (MVC Avançado)

[![Node.js Version](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-blue.svg)](https://expressjs.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.x-orange.svg)](https://sequelize.org/)
[![JWT](https://img.shields.io/badge/Auth-JWT-purple.svg)](https://jwt.io/)

API RESTful completa para um sistema de blog, desenvolvida com Node.js e Sequelize. O projeto evoluiu de uma estrutura simples para uma arquitetura MVC robusta, implementando relacionamentos complexos entre entidades, autenticação JWT, eager loading e filtros dinâmicos.

## 🏗️ Arquitetura e Tecnologias

| Camada | Tecnologia | Descrição |
|--------|------------|-----------|
| **Runtime** | Node.js | Ambiente de execução JavaScript |
| **Framework Web** | Express.js | Gerenciamento de rotas e middlewares |
| **ORM** | Sequelize (MySQL) | Mapeamento objeto-relacional |
| **Autenticação** | JWT | Tokens para segurança de rotas privadas |
| **Segurança** | Dotenv | Gerenciamento de variáveis de ambiente |

## 📁 Estrutura de Pastas Detalhada

```bash
├── src/
│   ├── config/
│   │   └── connection.js        # Configuração do Sequelize e conexão com MySQL
│   ├── controllers/
│   │   ├── CommentsController.js # Lógica para comentários (incluindo replies)
│   │   ├── PostsController.js    # CRUD de posts com filtros dinâmicos
│   │   ├── TagsController.js     # Gerenciamento de tags
│   │   └── UsersController.js    # Criação de usuário + perfil simultâneo
│   ├── database/
│   │   └── syncforce.js         # Script para recriação das tabelas (dev)
│   ├── models/
│   │   ├── CommentsModel.js      # Modelo com auto-relacionamento (parent_id)
│   │   ├── PostsModel.js         # Modelo de posts com relacionamentos
│   │   ├── ProfileModel.js       # Perfil do usuário (1:1 com User)
│   │   ├── TagsModel.js          # Tags para categorização de posts
│   │   └── UsersModel.js         # Usuários do sistema
│   ├── routes/
│   │   ├── RotasPrivadas.js      # Middleware JWT + definição de rotas protegidas
│   │   └── RotasPublicas.js      # Rotas públicas (se houver)
│   └── app.js                    # Configurações centrais do Express
├── .env                          # Variáveis de ambiente (não versionado)
├── package.json                  # Dependências e scripts
└── server.js                     # Ponto de entrada da aplicação
```

## 🔄 Modelagem do Banco de Dados (Relacionamentos)
A API implementa um mapeamento relacional completo para suportar todas as funcionalidades de um blog profissional:

| Entidade | Relacionamento	| Descrição |
| :--- | :--- | :--- |
| User ↔ Profile | 1:1 (hasOne)	| Cada usuário possui um perfil único com informações detalhadas |
| User ↔ Post | 1:N (hasMany) |	Um usuário pode escrever múltiplos posts |
| Post ↔ Tag | N:N (belongsToMany) | Posts e tags se relacionam através da tabela pivô post_tag |
| Comments | Self-Ref 1:N | Auto-relacionamento via parent_id para sistema de respostas |
| Post ↔ Comments | 1:N (hasMany) | Posts possuem múltiplos comentários (com deleção em cascata) |

## ⚡ Funcionalidades de Destaque
* Eager Loading: Carregamento otimizado de relacionamentos em uma única query

* Filtros Dinâmicos: Seleção de campos via Query String (?fields=title,slug)

* Integridade Referencial: Configuração onDelete: "CASCADE" para manter consistência dos dados

* Criação Atômica: Inserção de usuário e perfil em uma única operação

## 🚀 Como Executar o Projeto
# Pré-requisitos
* Node.js (versão 18 ou superior)

* MySQL Server (5.7 ou superior)

* Insomnia/Postman para testar os endpoints

# Passo a Passo
1. Clone o repositório

```bash
git clone [https://github.com/seu-usuario/blog-api.git](https://github.com/seu-usuario/blog-api.git)
cd blog-api
```

2. Instale as dependências

```bash
npm install
```

3. Configure o arquivo .env na raiz do projeto

```
env
## PORT=3000
APP_KEY_TOKEN=sua_chave_secreta_jwt_super_segura
DB_USER=root
DB_PASS=sua_senha_mysql
DB_NAME=blog_database
DB_HOST=localhost
DB_DIALECT=mysql
```

4. Sincronize as tabelas com o banco de dados

```bash
npm run sync
```

*Este script recria todas as tabelas com base nos modelos definidos.*

5. Inicie o servidor em modo desenvolvimento

```bash
npm run dev
```
O servidor estará disponível em [http://localhost:3000](http://localhost:3000)

## 📍 Documentação da API (Endpoints)
# 🔐 Autenticação (Middleware JWT)
Todas as rotas privadas exigem o token JWT no cabeçalho da requisição:

```text
Key: token
Value: <seu_token_jwt_aqui>
```

# 👥 Usuários (Rotas Privadas)
Método | Rota | Descrição | Funcionalidades Especiais
------- | ------- | ------- | -------
GET | /users | Lista todos os usuários | Exclusão automática do campo password
POST | /users |	Cria usuário + perfil |	Aceita objeto ProfileModel aninhado
GET | /users/:id | Busca usuário específico | Inclui perfil do usuário
PUT | /users/:id | Atualiza usuário	| -
DELETE | /users/:id | Remove usuário	| -

# 📄 Posts (Rotas Privadas)
Método | Rota | Descrição | Funcionalidades Especiais
------- | ------- | ------- | -------
GET | /posts | Lista todos os posts | Filtro dinâmico via ?fields=col1,col2
GET	| /posts/:id | Busca post por ID | Eager loading: autor + perfil + tags
POST | /posts | Cria novo post | Vincula tags via array de IDs
PUT	| /posts/:id | Atualiza post | -
DELETE | /posts/:id	 | Remove post | -

# 🏷️ Tags (Rotas Privadas)
Método | Rota |	Descrição
------- | ------- | -------
GET | /tags | Lista todas as tags
POST | /tags | Cadastra nova tag
PUT | /tags/:id | Atualiza tag existente
DELETE | /tags/:id | Remove tag

# 💬 Comentários (Rotas Privadas)
Método | Rota | Descrição | Funcionalidades Especiais
------- | ------- | ------- | -------
GET | /comments | Lista todos comentários | Retorna hierarquia de respostas
POST | /comments | Cria comentário | Suporta parent_id para replies
DELETE | /comments/:id | Remove comentário | -

## 🧪 Guia de Testes (Insomnia/Postman)
# 1️⃣ Criar Usuário com Perfil (Relacionamento 1:1)

~~~HttpLexer
HTTP
POST [http://localhost:3000/users](http://localhost:3000/users)
Headers: token: <seu_token>
## Body (JSON):
{
"email": "dev.teste@gmail.com",
"username": "DevTester",
"password": "senha_segura_123",
"ProfileModel": {
"firstname": "Talyson",
"surname": "Moraes",
"bio": "Desenvolvedor Full Stack apaixonado por Node.js e arquitetura de software."
} 
}
~~~

2️⃣ Criar Post com Tags (Relacionamento N:N)
*Certifique-se de que as tags com IDs 1, 2 e 5 existem previamente.*

~~~HttpLexer
http
POST [http://localhost:3000/posts](http://localhost:3000/posts)
Headers: token: <seu_token>
## Body (JSON):
{
"user_id": 1,
"title": "Arquitetura de APIs com Sequelize",
"slug": "arquitetura-api-sequelize",
"content": "Neste post vamos explorar relacionamentos complexos, eager loading e boas práticas...",
"tags": [1, 2, 5]
}
~~~

# 3️⃣ Listar Posts com Filtro de Campos
~~~HttpLexer
http
GET [http://localhost:3000/posts?fields=title,slug,content](http://localhost:3000/posts?fields=title,slug,content)
Headers: token: <seu_token>
~~~

**Resultado:** Apenas as colunas `title`, `slug` e `content` serão retornadas.

### 4️⃣ Criar Comentário e Resposta (Auto-Relacionamento)
## Comentário Principal:

~~~HttpLexer
http
POST [http://localhost:3000/comments](http://localhost:3000/comments)
Headers: token: <seu_token>
## Body (JSON):
{
"user_id": 1,
"post_id": 1,
"content": "Excelente post! Muito esclarecedor.",
"parent_id": null
}
~~~

## Resposta ao Comentário:
(Substitua 10 pelo ID do comentário principal)

~~~HttpLexer
http
POST [http://localhost:3000/comments](http://localhost:3000/comments)
Headers: token: <seu_token>
## Body (JSON):
{
"user_id": 2,
"post_id": 1,
"content": "Concordo plenamente! A parte sobre eager loading foi muito útil.",
"parent_id": 10
}
~~~

## 5️⃣ Consultar Post com Todos os Relacionamentos
~~~HttpLexer
http
GET [http://localhost:3000/posts/1](http://localhost:3000/posts/1)
Headers: token: <seu_token>
~~~

**Retorno Esperado:** Post + Autor + Perfil do Autor + Tags + Comentários

# 📊 Status Codes HTTP
Código | Descrição
------ | ------
200 OK | Requisição bem-sucedida
201 | Created	Recurso criado com sucesso
400 | Bad Request	Dados inválidos na requisição
401 | Unauthorized	Token ausente, inválido ou expirado
403 | Forbidden	Acesso negado
404 | Not Found	Recurso não encontrado
500 | Internal Server Error	Erro no servidor
### ⚠️ Observações Importantes
## 🔄 Deleção em Cascata (CASCADE)
No modelo `CommentsModel.js`, foi configurado `onDelete: "CASCADE"` para o relacionamento com post_id:

* *Impacto:* Ao deletar um post, *todos os comentários vinculados* serão removidos automaticamente do banco de dados

* *Benefício:* Mantém a integridade referencial e evita dados órfãos

## 🛠️ Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor com nodemon (hot reload)
npm run sync     # Recria todas as tabelas (útil em desenvolvimento)
npm start        # Inicia o servidor em modo produção
```

## 👤 Autor
Desenvolvido por *Talyson Roberto*