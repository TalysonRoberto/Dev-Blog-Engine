const UserModel = require('../models/UserModel');
const ProfileModel = require('../models/ProfileModel')


// Teste de criação de usuário
async function execute() {
    
    let user = await UserModel.create({
        is_active:2,
        email: "maria@gmail.com",
        username: "maria",
        password: 159
    });

    let profile = await  ProfileModel.create({
        user_id: user.id,
        firstname: "maria",
        surname: "sousa"
    })

    console.log(profile)

}

execute();