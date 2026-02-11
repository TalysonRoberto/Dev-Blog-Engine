const { DataTypes, Model } = require("sequelize");
const connection = require('../config/connection'); // Verifique se o caminho está correto

class Tags extends Model {}

Tags.init(
    {
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    },
    {
        // CORREÇÕES AQUI:
        timestamps: false,     // Estava "timetamps"
        sequelize: connection, // Estava "sequilize". Aqui você passa a instância da conexão.
        tableName: 'tags'
    }
);

module.exports = Tags;