// src/Spaces.jsx
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';

const Booked = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    date: new Date().toISOString().split('T')[0],
    status: 'all' // 'all', 'active', 'past'
  });
  const [deleteLoading, setDeleteLoading] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        setLoading(true);
        const response = await fetch('http://localhost:5000/api/reservas/usuario', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('No se pudieron cargar tus reservas');
        }

        const data = await response.json();
        
        // Obtener detalles de los espacios para cada reserva
        const reservationsWithDetails = await Promise.all(
          data.map(async (reservation) => {
            try {
              const spaceResponse = await fetch(`http://localhost:5000/api/espacios/${reservation.id_espacio}`);
              if (spaceResponse.ok) {
                const spaceData = await spaceResponse.json();
                return { ...reservation, space: spaceData };
              }
              return reservation;
            } catch (error) {
              console.error('Error fetching space details:', error);
              return reservation;
            }
          })
        );

        setReservations(reservationsWithDetails);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching reservations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [navigate]);

  const handleDeleteReservation = async (id) => {
    if (!confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      return;
    }
    
    try {
      setDeleteLoading(id);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/reservas/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.mensaje || 'Error al cancelar la reserva');
      }

      // Eliminar la reserva de la lista
      setReservations(prev => prev.filter(reservation => reservation.id !== id));
      alert('Reserva cancelada correctamente');
    } catch (err) {
      alert(err.message);
      console.error('Error deleting reservation:', err);
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Filtrar reservas
  const filteredReservations = reservations.filter(reservation => {
    // Filtrar por fecha si hay un filtro de fecha
    const dateMatch = !filter.date || 
      new Date(reservation.date).toISOString().split('T')[0] === filter.date;
    
    // Filtrar por estado
    if (filter.status === 'all') return dateMatch;
    
    const today = new Date();
    const reservationDate = new Date(reservation.date);
    
    if (filter.status === 'active' && reservationDate >= today) return dateMatch;
    if (filter.status === 'past' && reservationDate < today) return dateMatch;
    
    return false;
  });

  return (
    <>
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Mis Reservas</h1>
        
        {/* Filtros */}
        <section className="mb-8 bg-white rounded-xl shadow-md p-4">
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha
              </label>
              <input 
                type="date" 
                name="date"
                value={filter.date}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select 
                name="status"
                value={filter.status}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded-md p-2"
              >
                <option value="all">Todas</option>
                <option value="active">Activas</option>
                <option value="past">Pasadas</option>
              </select>
            </div>
            
            <button 
              onClick={() => setFilter({date: '', status: 'all'})}
              className="text-teal-600 border border-teal-600 px-4 py-2 rounded-md hover:bg-teal-50"
            >
              Limpiar filtros
            </button>
          </div>
        </section>

        {/* Resultados */}
        <section className="space-y-6">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            </div>
          ) : (
            <>
              {filteredReservations.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-md">
                  <p className="text-xl text-gray-600 mb-4">No tienes reservas para mostrar</p>
                  <button 
                    onClick={() => navigate('/spaces')}
                    className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition"
                  >
                    Explorar espacios
                  </button>
                </div>
              ) : (
                filteredReservations.map((reservation) => (
                  <div key={reservation.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <img 
                        src={`/room${reservation.id_espacio % 3 + 1}.png`}
                        alt={reservation.space?.name || 'Espacio reservado'} 
                        className="w-full md:w-56 h-40 object-cover" 
                      />
                      
                      <div className="p-6 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-gray-600 text-sm">
                              {reservation.space?.type === 'sala' ? 'Sala de Reuniones' : 
                               reservation.space?.type === 'escritorio' ? 'Escritorio Individual' : 'Área Colaborativa'}
                            </h3>
                            <p className="text-xl font-semibold">
                              {reservation.space?.name || 'Espacio'}
                            </p>
                          </div>
                          
                          <div className="text-right">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                              new Date(reservation.date) >= new Date() 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {new Date(reservation.date) >= new Date() ? 'Activa' : 'Pasada'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Fecha</p>
                            <p className="font-medium">
                              {new Date(reservation.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Hora inicio</p>
                            <p className="font-medium">{reservation.starttime}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Hora fin</p>
                            <p className="font-medium">{reservation.endtime}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Precio</p>
                            <p className="font-medium">
                              ${reservation.space ? parseInt(reservation.space.cost_per_hour).toLocaleString() : 'N/A'}/h
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex justify-end space-x-3">
                          <button 
                            onClick={() => navigate(`/bookings/${reservation.id_espacio}`)}
                            className="text-teal-600 border border-teal-600 px-4 py-2 rounded-md hover:bg-teal-50"
                          >
                            Ver espacio
                          </button>
                          
                          {new Date(reservation.date) >= new Date() && (
                            <button 
                              onClick={() => handleDeleteReservation(reservation.id)}
                              disabled={deleteLoading === reservation.id}
                              className={`bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition ${
                                deleteLoading === reservation.id ? 'opacity-70 cursor-not-allowed' : ''
                              }`}
                            >
                              {deleteLoading === reservation.id ? 'Cancelando...' : 'Cancelar reserva'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Booked;
