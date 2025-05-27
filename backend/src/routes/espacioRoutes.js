const express = require('express');
const { nuevoEspacio, obtenerEspacios } = require('../controllers/espacioController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router();

router.post('/', authenticateToken, nuevoEspacio);
router.get('/', authenticateToken, obtenerEspacios);

module.exports = router;
