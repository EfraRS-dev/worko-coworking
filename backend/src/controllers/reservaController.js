const { crearReserva, listarReservas, obtenerReservaPorId } = require('../models/reservaModel');
const jwt = require('jsonwebtoken');

// Nueva reserva
exports.nuevaReserva = async (req, res) => {
  try {
    // Extraer el ID del usuario del token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ mensaje: 'No autorizado' });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.body.id_usuario = decoded.id;
    } catch (err) {
      return res.status(401).json({ mensaje: 'Token inválido' });
    }
    
    const { id_usuario, id_espacio, date, starttime, endtime } = req.body;
    
    // Validar datos requeridos
    if (!id_usuario || !id_espacio || !date || !starttime || !endtime) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }
    
    // Validar formato de fecha y horas
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    const horaRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    
    if (!fechaRegex.test(date)) {
      return res.status(400).json({ mensaje: 'Formato de fecha inválido. Usar YYYY-MM-DD' });
    }
    
    if (!horaRegex.test(starttime) || !horaRegex.test(endtime)) {
      return res.status(400).json({ mensaje: 'Formato de hora inválido. Usar HH:MM' });
    }
    
    // Crear la reserva
    const nuevaReserva = await crearReserva({ id_usuario, id_espacio, date, starttime, endtime });
    res.status(201).json(nuevaReserva);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear la reserva', error: err.message });
  }
};

// Obtener todas las reservas
exports.obtenerReservas = async (req, res) => {
  try {
    const reservas = await listarReservas();
    res.status(200).json(reservas);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener reservas', error: err.message });
  }
};

// Obtener reserva por ID
exports.obtenerReservaPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const reserva = await obtenerReservaPorId(id);
    
    if (!reserva) {
      return res.status(404).json({ mensaje: 'Reserva no encontrada' });
    }
    
    res.status(200).json(reserva);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener la reserva', error: err.message });
  }
};


