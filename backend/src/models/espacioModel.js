const db = require('../config/db');

const crearEspacio = async ({ name, type, location, capacity, cost_per_hour }) => {
  const result = await db.query(
    `INSERT INTO espacio (name, type, location, capacity, cost_per_hour)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, type, location, capacity, cost_per_hour]
  );
  return result.rows[0];
};

const listarEspacios = async () => {
  const result = await db.query(`SELECT * FROM espacio`);
  return result.rows;
};

const obtenerEspacioPorId = async (id) => {
  const result = await db.query(
    `SELECT * FROM espacio WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

module.exports = { crearEspacio, listarEspacios, obtenerEspacioPorId };
