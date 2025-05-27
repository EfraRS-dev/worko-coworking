const express = require('express');
const { nuevaReserva, obtenerReservas } = require('../controllers/reservaController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router();

router.post('/', authenticateToken, nuevaReserva);
router.get('/', authenticateToken, obtenerReservas);

module.exports = router;
