const ProductoService = require('../services/productoServices');

class ProductoController {
    async getAllProducts(req, res) {
        try {
            const products = await ProductoService.getAllProducts();
            res.json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los productos' });
        }
    }

    async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await ProductoService.getProductById(id);
            product ? res.json(product) : res.status(404).json({ error: 'Producto no encontrado' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener el producto' });
        }
    }

    async createProduct(req, res) {
        try {
            const { nombre, categoria, precio } = req.body;
            const respuesta = await ProductoService.createProduct(nombre, categoria, precio);
            res.status(201).json(respuesta);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al crear el producto' });
        }
    }

    async deleteProduct(req, res) { 
        try {
            const { id } = req.params;
            const respuesta = await ProductoService.deleteProduct(id);
            res.json(respuesta);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al eliminar el producto' });
        }
    }

    async editProduct(req, res) {
        try {
            const { id } = req.params;
            const { nombre, categoria, precio } = req.body;
            const respuesta = await ProductoService.editProduct(id, nombre, categoria, precio);
            res.json(respuesta); 
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al editar el producto' });
        }
    }
}

module.exports = new ProductoController();