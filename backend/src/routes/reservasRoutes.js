const express = require('express');
const { nuevaReserva, obtenerReservas, obtenerReservaPorId } = require('../controllers/reservaController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router();

// Habilitar autenticación para crear reservas
router.post('/', authenticateToken, nuevaReserva);
router.get('/', obtenerReservas);
router.get('/:id', obtenerReservaPorId);

module.exports = router;
