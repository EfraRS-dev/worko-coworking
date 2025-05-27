const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { crearUsuario, buscarPorEmail } = require('../models/userModel');

exports.register = async (req, res) => {
  try {
    const { name, email, password, type } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const nuevoUsuario = await crearUsuario({ name, email, password: hashed, type });
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await buscarPorEmail(email);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const coincide = await bcrypt.compare(password, usuario.password);
    if (!coincide) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario.id, type: usuario.type }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
