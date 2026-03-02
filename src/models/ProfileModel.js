const { DataTypes, Model } = require("sequelize");
const connection = require('../config/connection'); // Verifique se o caminho está correto
const UserModel = require('./UserModel'); // infportando o UserModel (para referenciar a tabela)

class ProfileModel extends Model {}

ProfileModel.init(
    { 
        // aqui dentro instancia as colunas

        //Criando a Chave estrangeira
        user_id:{
            type: DataTypes.INTEGER, 
            allowNull: false,
            references:{ // referenciando o UserModel
                model: UserModel,
                key: 'id' // referenciando o ID do UserModel
            }
        },

        firstname: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        surname:{
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        picture_path: {
            type: DataTypes.STRING(45),
        },
        bio:{
            type: DataTypes.STRING(45),
        }
    },
    {
        tableName: 'profile', // passando o nome da tabela para não ser criado com o nome do model
        timestamps: false,
        sequelize: connection, 
    }
);

module.exports = ProfileModel;