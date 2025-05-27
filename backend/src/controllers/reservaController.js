const { crearReserva, listarReservas, obtenerReservasPorUsuario, obtenerReservaPorId } = require('../models/reservaModel');

exports.nuevaReserva = async (req, res) => {
  try {
    const reserva = await crearReserva(req.body);
    res.status(201).json(reserva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerReservas = async (req, res) => {
  try {
    const reservas = await listarReservas();
    res.json(reservas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


