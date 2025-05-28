// src/Spaces.jsx
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';

const Spaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    date: new Date().toISOString().split('T')[0],
    timeIn: '10:00',
    timeOut: '12:00',
    capacity: 4,
    minPrice: '',
    maxPrice: ''
  });

  // Imágenes estáticas de prueba
  const images = ["room1.png", "room2.png", "room3.png"];

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/espacios');
        
        if (!response.ok) {
          throw new Error('No se pudieron cargar los espacios');
        }
        
        const data = await response.json();
        console.log('Fetched spaces:', data);
        setSpaces(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los espacios: ' + err.message);
        console.error('Error fetching spaces:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching with filters:', filters);
  };

  return (
    <>
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filtros superiores */}
        <section className="flex shadow-md col-span-4 bg-white rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 rounded-r-none">
            <div className="px-6 my-3">
              <label className="flex gap-2 text-teal-800 font-semibold">
                <i className="ti ti-calendar-week-filled text-2xl"></i>Día
              </label>
              <input 
                type="date" 
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
                className="w-full" 
              />
            </div>
            <div className="px-4 my-3 border-l border-gray-400">
              <label className="flex gap-2 text-teal-800 font-semibold">
                <i className="ti ti-clock-hour-7-filled text-2xl"></i>Time In
              </label>
              <input 
                type="time" 
                name="timeIn"
                value={filters.timeIn}
                onChange={handleFilterChange}
                className="w-full" 
              />
            </div>
            <div className="px-4 my-3 border-l border-gray-400">
              <label className="flex gap-2 text-teal-800 font-semibold">
                <i className="ti ti-clock-hour-7-filled text-2xl"></i>Time Out
              </label>
              <input 
                type="time" 
                name="timeOut"
                value={filters.timeOut}
                onChange={handleFilterChange}
                className="w-full" 
              />
            </div>
            <div className="px-4 my-3 border-l border-gray-400">
              <label className="flex gap-2 text-teal-800 font-semibold">
                <i className="ti ti-user-filled text-2xl"></i>Capacidad
              </label>
              <input 
                type="number" 
                name="capacity"
                value={filters.capacity}
                onChange={handleFilterChange}
                className="w-full" 
                min={1} 
              />
            </div>
          </div>
          <button 
            onClick={handleSearch}
            className="cursor-pointer text-xl bg-teal-600 text-white rounded-xl rounded-l-none px-12 w-full md:w-auto flex items-center gap-2"
          >
            <i className="ti ti-search"></i>Buscar
          </button>
        </section>
        
        {/* Filtros */}
        <aside className="lg:col-span-1 space-y-6">
          <div>
            <h2 className="font-semibold text-2xl mb-4">Filtrar Por</h2>
            <h3 className="font-semibold text-base">Tu Presupuesto Por Hora</h3>
            <div className="flex space-x-2 mt-2">
              <input 
                type="number" 
                placeholder="Min Price" 
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className="w-full border rounded px-2 py-1" 
              />
              <input 
                type="number" 
                placeholder="Max Price" 
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="w-full border rounded px-2 py-1" 
              />
            </div>
          </div>

          { [
            "Tipo De Espacio",
            "Servicios Incluidos",
            "Tipo De Ambiente",
            "Nivel De Ruido",
            "Cancelación",
            "Tipo De Vista",
            "Calificación",
            "Tipo De Mobiliario"
          ].map((title) => (
            <div key={title}>
              <h2 className="font-semibold text-base">{title}</h2>
              <div className="space-y-1 mt-2">
                {[...Array(4)].map((_, i) => (
                  <label key={i} className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span>Opción {i + 1}</span>
                  </label>
                ))}
                <button className="text-teal-600 text-sm mt-1">Mostrar Más</button>
              </div>
            </div>
          ))}
        </aside>

        {/* Resultados */}
        <section className="lg:col-span-3 space-y-6">
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
              {/* Lista de espacios */}
              {spaces.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-lg text-gray-600">No se encontraron espacios disponibles</p>
                </div>
              ) : (
                spaces.map((space, idx) => (
                  <Link 
                    to={`/bookings/${space.id}`} 
                    key={space.id} 
                    className="flex rounded overflow-hidden shadow-md"
                  >
                    <img 
                      src={images[idx % images.length]} 
                      alt={space.name} 
                      className="w-40 h-40 object-cover flex-shrink-0" 
                    />
                    <div className="p-4 flex flex-col justify-between w-full">
                      <div>
                        <h3 className="text-gray-600 text-sm">
                          {space.type === 'sala' ? 'Sala de Reuniones' : 
                           space.type === 'escritorio' ? 'Escritorio Individual' : 'Área Colaborativa'}
                        </h3>
                        <p className="text-xl">{space.name}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Wifi • Silencioso • Aire Acondicionado
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-500">5.0 ⭐ (318 reviews)</span>
                        <span className="text-gray-500">
                          ${parseInt(space.cost_per_hour).toLocaleString()}
                          <span className="text-sm">
                            /Hora
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              )}

              {spaces.length > 0 && (
                <div className="text-center">
                  <button className="bg-teal-600 text-white px-6 py-2 rounded mt-4">
                    Más resultados <i className="ti ti-chevron-right"></i>
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Spaces;
