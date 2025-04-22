const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'] // Obtener el token del encabezado Authorization

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    } 
    try {
        const tokenBearer = token.replace('Bearer ', ''); // limpiar Bearer
        const decoded = jwt.verify(tokenBearer, 'secretp12'); // verificar token

        req.user = decoded; // aquí tienes { id, email }
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido' });
    }
}

module.exports = authMiddleware