-- Eliminar las tablas si existen (orden inverso por dependencias)
DROP TABLE IF EXISTS reserva;
DROP TABLE IF EXISTS espacio;
DROP TABLE IF EXISTS usuario;

-- Tabla: usuario
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('admin', 'user', 'provider')),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: espacio
CREATE TABLE espacio (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('sala', 'escritorio', 'otro')),
    location VARCHAR(255) NOT NULL,
    capacity INTEGER NOT NULL CHECK (capacity > 0),
    cost_per_hour NUMERIC(10,2) NOT NULL CHECK (cost_per_hour >= 0)
);

-- Tabla: reserva
CREATE TABLE reserva (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    id_espacio INTEGER NOT NULL REFERENCES espacio(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    starttime TIME NOT NULL,
    endtime TIME NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (endtime > starttime)
);

-- Seed data for usuarios (users)
-- Note: passwords are hashed with bcrypt, both are 'password123'
INSERT INTO usuario (name, email, password, type) VALUES 
('Admin User', 'admin@worko.com', '$2a$10$xVR.Lc9b0nP.z6JmGLGIZu9XDTLlzJ8Ld5zBJT1RBumZ1tpNtjB1a', 'admin'),
('Regular User', 'user@worko.com', '$2a$10$xVR.Lc9b0nP.z6JmGLGIZu9XDTLlzJ8Ld5zBJT1RBumZ1tpNtjB1a', 'user');

-- Seed data for espacios (spaces)
INSERT INTO espacio (name, type, location, capacity, cost_per_hour) VALUES 
('Sala de Conferencias A', 'sala', 'Piso 1, Ala Norte', 20, 50.00),
('Sala de Reuniones B', 'sala', 'Piso 2, Ala Sur', 8, 30.00),
('Escritorio Individual 1', 'escritorio', 'Zona Abierta, Piso 1', 1, 10.00),
('Área Colaborativa', 'otro', 'Terraza, Piso 3', 12, 25.00);

-- Seed data for reservas (reservations)
-- Creating a reservation for tomorrow from 10am to 12pm
INSERT INTO reserva (id_usuario, id_espacio, date, starttime, endtime) VALUES 
(2, 1, CURRENT_DATE + INTERVAL '1 day', '10:00:00', '12:00:00');
