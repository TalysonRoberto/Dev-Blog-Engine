// N:N
const { DataTypes, Model } = require("sequelize");
const connection = require('../config/connection');
const PostModel = require('./PostModel');
const UserModel = require("./UserModel");

class CommentsModel extends Model {
    // Definindo o relacionamento, nas demais tabelas estavamos fazendo isso no Controller
    static associate() {
        // Informando que tem uma conexão com a chave estrangeira dele mesmo
        CommentsModel.hasOne(CommentsModel,{
            foreignKey:"parent_id",
            as: 'children' // apelido do comentatio filho
        });

        // Informando que pertence a uma conexão com a chave estrangeira dele mesmo
        CommentsModel.belongsTo(CommentsModel,{
            foreignKey:"parent_id",
            as: "parents" // apelido para o comentario pai
        })
    }
}

CommentsModel.init(
    { 
        // referencia a chave estrangeira do usuário 
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
             references:{
                model: UserModel,
                key: 'id'
            },
            onDelete: "NO ACTION" // NO ACTION ou SET NULL
        },

        // referencia a chave estrangeira do post 
        post_id: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            references:{
                model: PostModel,
                key: 'id'
            },
            // EXTREMAMENTE INPORTANTE (SE O post_id FOR DELETADO O QUE TEM DEPENDENCI SERA DELETADO TBM) 
            onDelete: "CASCADE" // Deletado o comentario caso o relacionamento for deletado
        },
        
        // referencia a chave estrangeira do dela mesma  (CommentsModel)
        parent_id:{
            type: DataTypes.INTEGER, 
            allowNull: true,
            references:{
                model: CommentsModel,
                key: 'id'
            }
        },

        content:{
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {   
        timestamps: true,
        tableName: 'comments', // passando o nome da tabela para não ser criado com o nome do model
        sequelize: connection, 
    }
);

module.exports = CommentsModel;