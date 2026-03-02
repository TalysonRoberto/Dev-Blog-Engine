const connection = require('../config/connection');

// Importação dos modelos na ordem de dependência
require('../models/UserTypesModel');
require('../models/TagsModel');
require('../models/UserModel');
require('../models/ProfileModel');
require('../models/PostModel');
require('../models/PostTagModel');
require('../models/CommentsModel');
// ----------- ADD NEW-----------

connection.sync({force: true});
// Criamos uma função assíncrona para garantir a ordem de execução
// async function syncDatabase() {
//     try {
//         console.log("Iniciando sincronização forçada (force: true)...");
        
//         // O 'await' obriga o Node a esperar o banco responder antes de seguir
//         await connection.sync({ force: true });
        
//         console.log("✅ Banco de dados sincronizado e tabelas recriadas com sucesso!");
//     } catch (error) {
//         console.error("❌ Erro ao sincronizar o banco de dados:", error);
//     } finally {
//         // Encerra o script após terminar tudo
//         process.exit();
//     }
// }

// syncDatabase();