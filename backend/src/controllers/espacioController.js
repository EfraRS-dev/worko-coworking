const { crearEspacio, listarEspacios } = require('../models/espacioModel');

exports.nuevoEspacio = async (req, res) => {
  try {
    const espacio = await crearEspacio(req.body);
    res.status(201).json(espacio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerEspacios = async (req, res) => {
  try {
    const espacios = await listarEspacios();
    res.json(espacios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
