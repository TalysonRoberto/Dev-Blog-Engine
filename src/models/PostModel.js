const { DataTypes, Model } = require("sequelize");
const connection = require('../config/connection'); // Verifique se o caminho está correto
const UserModel = require('./UserModel');

class PostModel extends Model {}

PostModel.init(
    { 
        // aqui dentro instancia as colunas
        user_id: {
            type: DataTypes.INTEGER, // tipo do dado
            allowNull: false,
            references:{
                model: UserModel,
                key: 'id'
            }
        },
        title:{
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        content:{
            type: DataTypes.TEXT,
        },
        image_path: {
            type: DataTypes.STRING(255)
        }
    },
    {   
        tableName: 'posts', // passando o nome da tabela para não ser criado com o nome do model
        sequelize: connection, 
    }
);

module.exports = PostModel;