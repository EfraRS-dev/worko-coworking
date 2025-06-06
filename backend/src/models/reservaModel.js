const db = require('../config/db');

const crearReserva = async ({ id_usuario, id_espacio, date, starttime, endtime }) => {
  const result = await db.query(
    `INSERT INTO reserva (id_usuario, id_espacio, date, starttime, endtime, created)
     VALUES ($1, $2, $3, $4, $5, NOW())
     RETURNING *`,
    [id_usuario, id_espacio, date, starttime, endtime]
  );
  return result.rows[0];
};

const listarReservas = async () => {
  const result = await db.query(
    `SELECT r.*, u.name AS usuario, e.name AS espacio
     FROM reserva r
     JOIN usuario u ON r.id_usuario = u.id
     JOIN espacio e ON r.id_espacio = e.id
     ORDER BY r.date, r.starttime`
  );
  return result.rows;
};

const obtenerReservaPorId = async (id) => {
  const result = await db.query(
    `SELECT r.*, u.name AS usuario, e.name AS espacio
     FROM reserva r
     JOIN usuario u ON r.id_usuario = u.id
     JOIN espacio e ON r.id_espacio = e.id
     WHERE r.id = $1`,
    [id]
  );
  return result.rows[0];
};

const obtenerReservasPorUsuario = async (id_usuario) => {
  const result = await db.query(
    `SELECT r.*, e.name AS espacio
     FROM reserva r
     JOIN espacio e ON r.id_espacio = e.id
     WHERE r.id_usuario = $1
     ORDER BY r.date, r.starttime`,
    [id_usuario]
  );
  return result.rows;
};


// Eliminar una reserva por ID
const eliminarReserva = async (id) => {
  const result = await db.query(
    `DELETE FROM reserva WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

// Editar la fecha y horas de una reserva
const editarReserva = async (id, { date, starttime, endtime }) => {
  const result = await db.query(
    `UPDATE reserva
     SET date = $1, starttime = $2, endtime = $3
     WHERE id = $4 RETURNING *`,
    [date, starttime, endtime, id]
  );
  return result.rows[0];
};


module.exports = { crearReserva, listarReservas, obtenerReservasPorUsuario,
   obtenerReservaPorId, eliminarReserva, editarReserva };
