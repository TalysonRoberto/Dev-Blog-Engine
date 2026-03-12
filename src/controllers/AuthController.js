const UserModel = require("../models/UserModel"); // importando usermodel
const MD5 = require('crypto-js/md5')

class AuthController{
    async login (username, password){
        const dados = await UserModel.findOne({
            where: {
                username: username,
                password: MD5(password).toString()
            }
        });
        
        return dados;
    }
}

module.exports = AuthController;