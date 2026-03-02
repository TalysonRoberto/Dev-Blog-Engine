const TagsModel = require('../models/TagsModel');

class TagsController {
    async listar(request, response) {
        try {
            let dados = await TagsModel.findAll();
            return response.json(dados);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async criar(request, response) {
        try {
            let body = request.body;
            // Corrigido: create (com e no final)
            const novaTag = await TagsModel.create(body);
            return response.status(201).json({
                message: "Tag criada com sucesso!",
                data: novaTag
            });
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }

        // EX do bady:
        // {
        //     "name": "CSS"
        // }
    }
}

module.exports = TagsController;