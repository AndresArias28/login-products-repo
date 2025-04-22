const UserService = require('../services/userServices');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


class UserController {
    
    async getAllUsers(req, res) {
        const users = await UserService.getAllUsers();
        res.json(users);
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
    
            // Buscar el usuario por email
            const user = await UserService.login(email);
    
            // Validar si el usuario existe
            if (!user) {
                console.log("Usuario no encontrado");
                return res.status(401).json({ message: "Login incorrecto, usuario no encontrado" });
            }
    
            // Comparar la contraseña
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                console.log("Contraseña incorrecta");
                return res.status(401).json({ message: "Login incorrecto, contraseña incorrecta" });
            }
    
            // Si todo está bien, generar el token
            const token = jwt.sign({ id: user.id, email: user.email }, "secretp12", {
                expiresIn: "1h",
            });
    
            // Devolver respuesta exitosa
            return res.json({ token, user });
    
        } catch (error) {
            console.error("Error en login:", error);
            return res.status(500).json({ message: "Error, usuario no encontrado" });
        }
    }
    

    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            const hasshContra = await bcrypt.hash(password, 10)//haseo contraseña, el 10 significa que se hasea 10 veces
            const respuesta = await UserService.register(name, email, hasshContra)//
            console.log("esta es la respuestaaaaaaaaaaaaaa", respuesta);
            res.status(201).json(respuesta);
        } catch (error) {
            console.error(error);
        };
    }

}

module.exports = new UserController();
