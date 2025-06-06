const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const reservaRoutes = require('./routes/reservasRoutes');
const espacioRoutes = require('./routes/espacioRoutes');

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/api/usuarios', userRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/espacios', espacioRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
