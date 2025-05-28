const express = require('express');
const { nuevaReserva, obtenerReservas, obtenerReservaPorId, editarReserva,
     eliminarReserva, obtenerReservasPorUsuario  } = require('../controllers/reservaController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router();

router.post('/', authenticateToken, nuevaReserva);
router.get('/', obtenerReservas);
router.get('/usuario', authenticateToken, obtenerReservasPorUsuario);

router.get('/:id', obtenerReservaPorId);
router.put('/:id', authenticateToken, editarReserva);
router.delete('/:id', authenticateToken, eliminarReserva);

module.exports = router;
