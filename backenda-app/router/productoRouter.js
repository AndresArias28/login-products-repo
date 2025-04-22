const express = require('express');
const router = express.Router();
const productoController = require('../controller/productoController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/getAllProducts',  productoController.getAllProducts);
router.post('/createProduct',  productoController.createProduct);
router.delete('/deleteProduct/:id',  productoController.deleteProduct);
router.post('/addProduct', authMiddleware, productoController.createProduct);
router.put('/editProduct/:id',  productoController.editProduct);
router.get('/getProduct/:id',  productoController.getProductById);

module.exports = router;