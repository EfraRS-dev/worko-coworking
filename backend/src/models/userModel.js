const db = require('../config/db');

const crearUsuario = async ({ name, email, password, type }) => {
  const result = await db.query(
    `INSERT INTO usuario (name, email, password, type, created)
     VALUES ($1, $2, $3, $4, NOW())
     RETURNING id, name, email, type, created`,
    [name, email, password, type]
  );
  return result.rows[0];
};

const buscarPorEmail = async (email) => {
  const result = await db.query(
    `SELECT * FROM usuario WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};

module.exports = { crearUsuario, buscarPorEmail };
