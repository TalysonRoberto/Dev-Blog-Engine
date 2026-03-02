const UserModel = require('../models/UserModel');
const ProfileModel = require('../models/ProfileModel');

// - Estaremos configurando para puxar o ProfileModel que esta vinculado ao UserModel
// - foreignKey - informa a chave estranjeira do ProfileModel
UserModel.hasOne(ProfileModel,{foreignKey: "user_id"}); // Faz a busca da chave estrangeira

class UserController {
    // ============================== LISTAR =================================
    async listar(request, response) {
        try {

            let query = request.query;
            let users=[];

            if (query.fields){  // verifica se existe o "fields"
                query =  query.fields.split(',');
                    if(query.includes("password")){ // barra se for passado senha
                        return response.json({
                            message: "O parametro solicitado não pode ser passado",
                            motivo: "A solicitação esta fora do requisito de segurança"
                        });
                    }else{
                        users = await UserModel.findAll({
                        attributes:query,
                    })
                }
                // Ex da pesquisa : 
                // users?fields=username,email
            }else{
                 // - hasOne - Informa que o usuário tem um perfil        
                 users = await UserModel.findAll({ 
                    attributes: { exclude: ['password'] }, // exclue o password
                    include: ProfileModel
                });    // Incluie o profile no user          
            }
           
            return response.json(users);

            // - belongsTo - Informa que o perfil tem um usuário
            // ProfileModel.belongsTo(UserModel,{foreignKey: "user_id"});           // Faz a busca da chave estrangeira
            // const profile = await ProfileModel.findAll({ include: UserModel});   // Incluie o user no profile          
            // return response.json(profile);

        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

     // ============================== CRIAR =================================
    async criar(request, response) {
        try {
            // Ja esta sendo refernciado do inicio UserModel.hasOne(ProfileModel,{foreignKey: "user_id"}); // Informa que o usuário tem um perfil
            const body = request.body;                              // busca o body passado
            UserModel.create(body, {include: ProfileModel});        // Cria passando o body e incluindo o ProfileModel
            return response.status(201).json({
                message: "Usuario cadastrado com sucesso!",
            });
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }

        // Ex do body:
        // {
        //   "email": "sansão@gmail.com",
        //   "username": "Sansão",
        //   "password": 159753,
        //   "ProfileModel":{
        //      "firstname": "sum",
        //      "surname": "Sansão"
        //    }
        // }
    }
}

module.exports = UserController;