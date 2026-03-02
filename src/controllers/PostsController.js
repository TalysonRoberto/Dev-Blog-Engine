const PostModel = require('../models/PostModel');
const UserModel = require('../models/UserModel');
const ProfileModel = require('../models/ProfileModel');
const PostTagModel = require('../models/PostTagModel')
const TagModel = require('../models/TagsModel');
const { response } = require('express');

// User <-> Profile (1:1)
// User <-> Post (1:N)
// Post <-> Tag (N:N via PostTag)

 PostModel.belongsTo(UserModel,{foreignKey:"user_id"});     // pegando o usuário do post
    UserModel.hasOne(ProfileModel,{foreignKey: "user_id"});    // pegando o profile do usuário
    PostModel.belongsToMany(TagModel,{ through: PostTagModel,  // Informa a tabela referenciada e informa a tabela que junta os dois                   
    foreignKey: 'post_id',                                 // informa as chaves estrangeiras da tabela 1
    otherKey: 'tag_id'                                     // informa as chaves estrangeiras da tabela 2
});

class PostsController {
    // ============================== LISTAR =================================
    async listar(request, response) {
        try {

            let query = request.query;
            let dados=[];

            if (query.fields){  // verifica se existe o "fields"
                query =  query.fields.split(',');
                dados = await PostModel.findAll({
                    attributes:query
                })
                // Ex da pesquisa : 
                // posts?fields=title
            }else{              // se não existir o filtro faz normal
                 dados = await PostModel.findAll({      // pegando o profile e o user
                    include:[                                 // Cria um objeto para poder passar o:
                    {
                        model: UserModel,                     // Usuário
                        include: ProfileModel                 // Profile
                    },
                    {
                        model: TagModel                      // Tag Tabela relacionaou N:N
                    }
                 ]
                });
            }
            // const dados = await PostModel.findAll({ include: UserModel}); // inclue o usuário no post (normal)
            return response.json(dados);

        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    // =========================== BUSCAR POR ID ============================
    async consultarPorId(request,response){
        try{
            let id = request.params.id
            let post = await PostModel.findByPk(id,{  // findByPk buscando pela chave primaria
                // attributes: [""] tbm posso escolher os atributos aqui
                include: {
                    model:UserModel,
                    attributes: // attributes passa o que eu quero mostrar(não incluir o password)
                    ["email","is_active","username" ],
                    include:{
                        model:ProfileModel,
                        attributes:
                        ['firstname','surname']
                    }
                }
            });
            return response.json(post);
        }
        catch (error) {
            return response.status(400).json({ error: error.message });
        }
        
    }

    // ============================== CRIAR =================================
    async criar(request, response) {
        try {
            // - belongsToMany : pertence a vários 
            // JÁ REFERENCIADO NO INICO
            //    PostModel.belongsToMany(TagModel,{   // Informa a tabela referenciada
            //         through: PostTagModel,          // informa a tabela que junta os dois
            //         foreignKey: 'post_id',          // informa as chaves estrangeiras da tabela 1
            //         otherKey: 'tag_id'            // informa as chaves estrangeiras da tabela 2
            //    });

           const {tags, ...body} = request.body;   // pega o body

           let post = await PostModel.create(body,{ // Criando
                include:{
                    through:PostTagModel,
                    model:TagModel
                }
           });

           post.setTags(tags);

           return response.status(201).json({
                message: "Post cadastrado com sucesso"
           })
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }

        // Ex do body:
        // {
        //     "user_id": "3",                  // id do usuário 
        //     "title": "Pagina responsiva",    // Titulo da postagem 
        //     "slug": "pagina_responsiva",     // como vai aparecer na URL
        //     "tags": [3]                      // tags (tabela rea)
        // }
    }

    // ============================== CRIAR =================================
    async atualizar(request, response){
        try{
            const id = request.params.id; // pega o id que vem na url
            const body = request.body; // pega o texto que vem no body

            await PostModel.update(body, // informa a atualização com os dados do body
                {where:{id}} // where a condição (no caso o ID)
            );

            return response.json({message: "Post atualizado com sucesso"})
        }
        catch(error){
            return response.status(400).json({ error: error.message});
        }

        // Ex:
        // passo o id na url: /posts/1
        // body:
        // {
        //     "title": "Nova informação atualizada"
        //     ""
        //     posso passar mais informações
        // }
    } 

    // ============================== Deletar =================================
    async deletar (request, response){
       try{
            const id = request.params.id
            await PostModel.destroy({ // destroy deleta uma linha da tabela
                where:{id} // where condição (id)
            })
            return response.json({message:"Publicação deletada com sucesso!"})
       }
       catch(error){
            return response.status(400).json({error: error.message})
       }
    }

    //       ESSE DELETAR PODE SER USADO SE NÃO EXISTIR DEPENDENCIAS 
    // ============================== Deletar =================================
    // async deletar (request, responde){
    //    try{
    //         const id = request.params.id
    //         await PostModel.destroy({ // destroy deleta uma linha da tabela
    //             where:{id} // where condição (id)
    //         })
    //         return response.json({message:"Publicação deletada com sucesso!"})
    //    }
    //    catch(error){
    //         return response.status(400).json({error: error.message})
    //    }
    // }
   
}

module.exports = PostsController;