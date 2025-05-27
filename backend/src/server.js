const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const espacioRoutes = require('./routes/espacioRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/usuarios', userRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/espacios', espacioRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
