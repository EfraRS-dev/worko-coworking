const express = require('express');
const { nuevoEspacio, obtenerEspacios, obtenerEspacioPorId } = require('../controllers/espacioController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router();

// router.post('/', authenticateToken, nuevoEspacio);
router.post('/', nuevoEspacio);
// router.get('/', authenticateToken, obtenerEspacios);
router.get('/', obtenerEspacios);
router.get('/:id', obtenerEspacioPorId);

module.exports = router;
