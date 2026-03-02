const { DataTypes, Model } = require("sequelize");
const connection = require('../config/connection'); // Verifique se o caminho está correto

class UserModel extends Model {}

UserModel.init(
    { 
        // aqui dentro instancia as colunas
        is_active: {
            type: DataTypes.TINYINT(1), // tipo do dado
            defaultValue: 0,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING(45),
            allowNull: false,
        }
    },
    {   
        tableName: 'users', // passando o nome da tabela para não ser criado com o nome do model
        sequelize: connection, 
    }
);

module.exports = UserModel;