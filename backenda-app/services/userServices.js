const { User } = require('../models/');

class UserService {
    async getAllUsers() {
        return await User.findAll({
            attributes: [ 'name', 'email', 'password']
        });
    }

    async login(email) {
        try {
            const respuesta = await User.findOne({ where: { email: email } });
            if (respuesta==null) {
                return "Login incorrecto, usuario no encontrada";
            }  
            console.log("la respuesta es", respuesta);
            return respuesta;
        }
        catch (error) {     
            console.error(error);
        };
    }

    async register(name, email, password) {
        const respuesta = await User.create({
            name,
            email,
            password
        });
        return respuesta;

    }
}

module.exports = new UserService();