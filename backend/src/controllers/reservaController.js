const { crearReserva, listarReservas, obtenerReservaPorId, obtenerReservasPorUsuario, eliminarReserva, editarReserva } = require('../models/reservaModel');
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

// Obtener reservas por usuario
exports.obtenerReservasPorUsuario = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ mensaje: 'No autorizado' });
    }
    
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ mensaje: 'Token inválido' });
    }
    
    const id_usuario = decoded.id;
    const reservas = await obtenerReservasPorUsuario(id_usuario);
    
    res.status(200).json(reservas);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener reservas del usuario', error: err.message });
  }
};

// Editar una reserva existente
exports.editarReserva = async (req, res) => {
  try {
    const id = req.params.id;
    const { date, starttime, endtime } = req.body;
    
    // Validar datos requeridos
    if (!date || !starttime || !endtime) {
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
    
    // Verificar que la reserva pertenece al usuario autenticado
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ mensaje: 'No autorizado' });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const id_usuario = decoded.id;
      
      // Obtener la reserva actual para verificar el propietario
      const reservaActual = await obtenerReservaPorId(id);
      
      if (!reservaActual) {
        return res.status(404).json({ mensaje: 'Reserva no encontrada' });
      }
      
      // Solo el propietario puede editar la reserva
      if (reservaActual.id_usuario !== id_usuario) {
        return res.status(403).json({ mensaje: 'No tienes permiso para editar esta reserva' });
      }
      
      // Editar la reserva
      const reservaActualizada = await editarReserva(id, { date, starttime, endtime });
      
      if (!reservaActualizada) {
        return res.status(404).json({ mensaje: 'No se pudo actualizar la reserva' });
      }
      
      res.status(200).json(reservaActualizada);
      
    } catch (err) {
      return res.status(401).json({ mensaje: 'Token inválido' });
    }
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al actualizar la reserva', error: err.message });
  }
};

// Eliminar una reserva
exports.eliminarReserva = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Verificar que la reserva pertenece al usuario autenticado
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ mensaje: 'No autorizado' });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const id_usuario = decoded.id;
      
      // Obtener la reserva actual para verificar el propietario
      const reservaActual = await obtenerReservaPorId(id);
      
      if (!reservaActual) {
        return res.status(404).json({ mensaje: 'Reserva no encontrada' });
      }
      
      // Solo el propietario puede eliminar la reserva
      if (reservaActual.id_usuario !== id_usuario) {
        return res.status(403).json({ mensaje: 'No tienes permiso para eliminar esta reserva' });
      }
      
      // Eliminar la reserva
      const resultado = await eliminarReserva(id);
      
      if (!resultado) {
        return res.status(404).json({ mensaje: 'No se pudo eliminar la reserva' });
      }
      
      res.status(200).json({ mensaje: 'Reserva eliminada correctamente' });
      
    } catch (err) {
      return res.status(401).json({ mensaje: 'Token inválido' });
    }
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar la reserva', error: err.message });
  }
};
