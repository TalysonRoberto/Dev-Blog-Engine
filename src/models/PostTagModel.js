// N:N
const { DataTypes, Model } = require("sequelize");
const connection = require('../config/connection');
const PostModel = require('./PostModel');
const TagsModel = require('./TagsModel');

class PostTagModel extends Model {}

PostTagModel.init(
    { 
        // referencia a chave estrangeira PostModel
        post_id: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            references:{
                model: PostModel,
                key: 'id'
            }
        },
        
        // referencia a chave estrangeira TagsModel
        tag_id:{
            type: DataTypes.INTEGER, 
            allowNull: false,
            references:{
                model: TagsModel,
                key: 'id'
            }
        },
    },
    {   
        timestamps: false,
        tableName: 'post_tag', // passando o nome da tabela para não ser criado com o nome do model
        sequelize: connection, 
    }
);

module.exports = PostTagModel;