const connection = require('../config/connection');
const { DataTypes } = require("sequelize");

//criando a tabela (connection.define é o nome da conexão com o banco)
const UserTypesModel = connection.define("UserTypesModel",
    {
		type:
            {  // Para informar que não pode ser NULL tem que criar um objeto
                    type: DataTypes.STRING(45), // define a variável
                    allowNUll: false  // define que não pode ser null
            },
    },
    {
        tableName: "user_types" // eu passo o nome real da tabela para ele não criar no plural
    }

);

connection.sync({force:true});

module.exports= UserTypesModel;