const { crearEspacio, listarEspacios, obtenerEspacioPorId } = require('../models/espacioModel');

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

exports.obtenerEspacioPorId = async (req, res) => {
  try {
    const espacio = await obtenerEspacioPorId(req.params.id);
    if (!espacio) {
      return res.status(404).json({ error: 'Espacio no encontrado' });
    }
    res.json(espacio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
