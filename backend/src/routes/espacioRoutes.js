const express = require('express');
const { nuevoEspacio, obtenerEspacios } = require('../controllers/espacioController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router();

// router.post('/', authenticateToken, nuevoEspacio);
router.post('/', nuevoEspacio);
// router.get('/', authenticateToken, obtenerEspacios);
router.get('/', obtenerEspacios);

module.exports = router;
