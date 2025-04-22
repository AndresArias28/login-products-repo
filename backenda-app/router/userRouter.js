const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registerUser', usuarioController.register);
router.post('/loginUser', usuarioController.login);
router.get('/getAllUsers', authMiddleware, usuarioController.getAllUsers);

module.exports = router;    