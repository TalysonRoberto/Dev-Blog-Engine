const { Sequelize } = require("sequelize");
require('dotenv').config(); // Garante que ele leia o .env aqui também

const connection = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
        host: "localhost",
        dialect: "mysql",
        port: 3306,
        logging: false 
    }
);

module.exports = connection;