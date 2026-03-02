const CommentsModel = require("../models/CommentsModel");



class CommentsController {

    // ================== DEFINIR RELACIONAMENTO NO CONSTRUCTOR =================
    constructor(){
        // Estamos deficinindo o relacionamento no model
        CommentsModel.associate();
    }

    // ============================== LISTAR =================================
    async listar(request, response) {
        try {
            // Incluindo a informação encontrada da chave estrangeira
            const dados = await CommentsModel.findAll({
                include: [
                    {
                        model:CommentsModel,
                        as: 'children'
                    },
                    {
                        model:CommentsModel,
                        as: 'parents'
                    }
            ]
            });
            return response.json(dados);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

     // ============================== CRIAR =================================
    async criar(request, response) {
        try {
            
            const body = request.body           // Pegando o body
            CommentsModel.create(body)          // Passando para o model criar

            return response.status(201).json({
                message: "Comentario realizado com sucesso"
            })
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }

    }

    // Ex do body:
    // {
    //     "user_id": 1,
    //     "post_id": 1,
    //     "parent_id": 3,
    //     "content": "Comentario 3 sensacional!"
    // }
}

module.exports = CommentsController;