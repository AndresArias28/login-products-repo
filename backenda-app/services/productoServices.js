const {Producto} = require('../models/');

class ProductoService {
    async getAllProducts() {
        return await Producto.findAll({
            attributes: ['id', 'nombre', 'categoria', 'precio']
        });
    }

    async createProduct(name, category, price) {
        const respuesta = await Producto.create({
            nombre: name,
            categoria: category,
            precio: price
        });
        return respuesta;
    }

    async deleteProduct(id) {
        const respuesta = await Producto.destroy({ where: { id: id } });
        return respuesta;
    }

    async editProduct(id, name, category, price) {
        const respuesta = await Producto.update({
            nombre: name,
            categoria: category,        
            precio: price
        }, { where: { id: id } });
        return respuesta;
    }

    async getProductById(id) {
        return await Producto.findByPk(id, {
            attributes: ['id', 'nombre', 'categoria', 'precio']
        });
    }


}

module.exports = new ProductoService();