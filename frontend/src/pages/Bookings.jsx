import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Bookings() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservationData, setReservationData] = useState({
    date: new Date().toISOString().split('T')[0],
    starttime: '08:00',
    endtime: '12:00'
  });
  const [totalHours, setTotalHours] = useState(4);
  const [totalCost, setTotalCost] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [reservationError, setReservationError] = useState(null);

  // Cargar información del espacio
  useEffect(() => {
    const fetchSpaceDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/espacios/${id}`);
        
        if (!response.ok) {
          throw new Error('No se pudo cargar la información del espacio');
        }
        
        const data = await response.json();
        setSpace(data);
        
        // Calcular costos iniciales
        const cleaningFee = 10000;
        const serviceFee = 5000;
        const techFee = 8000;
        const subtotal = data.cost_per_hour * 4;
        const iva = (subtotal + cleaningFee + serviceFee + techFee) * 0.19;
        const total = subtotal + cleaningFee + serviceFee + techFee + iva;
        
        setTotalCost({
          hourlyRate: data.cost_per_hour,
          subtotal,
          cleaningFee,
          serviceFee,
          techFee,
          iva: Math.round(iva),
          total: Math.round(total)
        });
        
      } catch (err) {
        setError(err.message);
        console.error('Error fetching space details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSpaceDetails();
    }
  }, [id]);

  // Calcular horas y actualizar costos cuando cambian los tiempos
  useEffect(() => {
    if (!space) return;
    
    const start = new Date(`2000-01-01T${reservationData.starttime}`);
    const end = new Date(`2000-01-01T${reservationData.endtime}`);
    
    // Si la hora de fin es menor que la hora de inicio, asumimos que es el día siguiente
    let diffHours = (end - start) / (1000 * 60 * 60);
    if (diffHours <= 0) {
      diffHours = 24 + diffHours;
    }
    
    setTotalHours(diffHours);
    
    // Actualizar costos
    const subtotal = space.cost_per_hour * diffHours;
    const cleaningFee = 10000;
    const serviceFee = 5000;
    const techFee = 8000;
    const iva = (subtotal + cleaningFee + serviceFee + techFee) * 0.19;
    
    setTotalCost({
      hourlyRate: space.cost_per_hour,
      subtotal,
      cleaningFee,
      serviceFee,
      techFee,
      iva: Math.round(iva),
      total: Math.round(subtotal + cleaningFee + serviceFee + techFee + iva)
    });
    
  }, [reservationData.starttime, reservationData.endtime, space]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReservation = async (e) => {
    e.preventDefault();
    
    // Verificar si el usuario está autenticado
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Debes iniciar sesión para realizar una reserva');
      navigate('/login');
      return;
    }
    
    setSubmitting(true);
    setReservationError(null);
    
    try {
      // Obtener el ID del usuario del token
      // Nota: En una app real, deberías decodificar el token o usar un contexto de autenticación
      // Para simplificar, asumimos que el backend extraerá el ID del usuario del token
      
      const response = await fetch('http://localhost:5000/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id_espacio: parseInt(id),
          date: reservationData.date,
          starttime: reservationData.starttime,
          endtime: reservationData.endtime
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.mensaje || 'Error al crear la reserva');
      }
      
      // Reserva exitosa
      alert('¡Reserva realizada con éxito!');
      navigate('/booked');
      
    } catch (err) {
      setReservationError(err.message);
      console.error('Error creating reservation:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen font-sans text-gray-900">
        <Header />
        <main className="flex justify-center items-center h-[80vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen font-sans text-gray-900">
        <Header />
        <main className="px-8 py-12 max-w-7xl mx-auto">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p>{error}</p>
            <button 
              onClick={() => navigate('/spaces')} 
              className="mt-4 bg-teal-600 text-white px-4 py-2 rounded"
            >
              Volver a espacios
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!space) {
    return (
      <div className="min-h-screen font-sans text-gray-900">
        <Header />
        <main className="px-8 py-12 max-w-7xl mx-auto">
          <div className="text-center">
            <p>No se encontró el espacio solicitado</p>
            <button 
              onClick={() => navigate('/spaces')} 
              className="mt-4 bg-teal-600 text-white px-4 py-2 rounded"
            >
              Volver a espacios
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans text-gray-900">
      <Header />

      <main className="px-8 py-12 gap-8 flex flex-col max-w-7xl mx-auto">
        {/* Left column */}
        <div className="">
          <h1 className="text-2xl font-semibold mb-2">{space.name}</h1>
          <p className="text-sm text-gray-500">⭐ 4.8 · 7 reseñas</p>

          {/* Images */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            <img src="/room1.png" alt="Main Room" className="object-cover w-full col-span-2" />
            <div className="flex flex-col gap-2">
              <img src="/room1.png" alt="Room 1" className="object-cover" />
              <img src="/room1.png" alt="Room 2" className="object-cover" />
            </div>
            <div className="flex flex-col gap-2">
              <img src="/room1.png" alt="Room 4" className="object-cover" />
              <img src="/room1.png" alt="Room 3" className="object-cover" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-8">
          <div className="col-span-4">
            {/* Description */}
            <section className="mt-6">
              <h2 className="font-semibold text-lg mb-2">
                {space.type === 'sala' ? 'Sala de Reuniones' : 
                 space.type === 'escritorio' ? 'Escritorio Individual' : 'Área Colaborativa'}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {space.capacity} personas · {space.location}
              </p>
              <p className="text-gray-700">
                Espacio ideal para equipos pequeños, entrevistas o reuniones ejecutivas. Esta sala cuenta con capacidad máxima para {space.capacity} personas, vista exterior que aporta luz natural, lockers individuales para mayor seguridad y almacenamiento, y un ambiente totalmente privado para garantizar la confidencialidad de tus conversaciones. Equipada con mobiliario ergonómico, televisor y acceso a Wi-Fi de alta velocidad.
              </p>
            </section>

            {/* Amenities */}
            <section className="mt-8">
              <h2 className="font-semibold text-lg mb-2">Servicios Ofrecidos con la Sala</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm text-gray-700">
                <span className="flex gap-2"><i className="ti ti-check text-xl"></i> Vista Exterior</span>
                <span className="flex gap-2"><i className="ti ti-check text-xl"></i> Café o Snacks Incluidos</span>
                <span className="flex gap-2"><i className="ti ti-check text-xl"></i> Wifi</span>
                <span className="flex gap-2"><i className="ti ti-check text-xl"></i> Seguridad en la Sala</span>
                <span className="flex gap-2"><i className="ti ti-check text-xl"></i> Televisor</span>
                <span className="flex gap-2"><i className="ti ti-check text-xl"></i> Lockers</span>
                <span className="flex gap-2"><i className="ti ti-check text-xl"></i> Aire Acondicionado</span>
              </div>
            </section>
          </div>

          {/* Right column - Reservation */}
          <aside className="flex flex-col gap-2 col-span-2 border rounded-xl p-6 shadow-sm h-fit">
            <p className="text-xl font-semibold">${parseInt(space.cost_per_hour).toLocaleString()} <span className="text-base font-normal">/ Hora</span></p>
            <p className="text-sm text-gray-500">⭐ 4.8 · 7 reseñas</p>

            {reservationError && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-sm mt-2">
                <p>{reservationError}</p>
              </div>
            )}

            <form onSubmit={handleReservation} className="mt-4">
              <div className="grid grid-cols-2">
                <div className="border border-gray-400 border-r-0 rounded-t-xl rounded-r-none rounded-b-none">
                  <label className="text-sm font-medium block p-2 pb-0">TIME-IN</label>
                  <input 
                    type="time" 
                    name="starttime"
                    value={reservationData.starttime}
                    onChange={handleInputChange}
                    className="w-full p-2 pt-0" 
                    required
                  />
                </div>

                <div className="border border-gray-400 rounded-t-xl rounded-l-none rounded-b-none">
                  <label className="text-sm font-medium block p-2 pb-0">TIME-OUT</label>
                  <input 
                    type="time" 
                    name="endtime"
                    value={reservationData.endtime}
                    onChange={handleInputChange}
                    className="w-full p-2 pt-0" 
                    required
                  />
                </div>

                <div className="col-span-2 border border-gray-400 border-t-0 rounded-b-xl rounded-t-none">
                  <label className="text-xs font-medium block p-2 pb-0">DÍA</label>
                  <input 
                    type="date" 
                    name="date"
                    value={reservationData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="text-sm w-full p-2 pt-0" 
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={submitting}
                className={`bg-teal-600 mt-4 text-white w-full py-2 rounded-xl mb-4 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {submitting ? 'Procesando...' : 'Reservar'}
              </button>
            </form>

            <span className="flex font-medium justify-center text-sm text-gray-400">Detalles del Pago</span>
            <ul className="mt-2 space-y-1">
              <li className='flex justify-between'>
                <span>${parseInt(totalCost.hourlyRate).toLocaleString()} x {totalHours} Horas</span>
                <span>${parseInt(totalCost.subtotal).toLocaleString()}</span>
              </li>
              <li className='flex justify-between'>
                <span>Cargo por Limpieza</span>
                <span>${parseInt(totalCost.cleaningFee).toLocaleString()}</span>
              </li>
              <li className='flex justify-between'>
                <span>Cargo por Servicios</span>
                <span>${parseInt(totalCost.serviceFee).toLocaleString()}</span>
              </li>
              <li className='flex justify-between'>
                <span>Mantenimiento Tecnológico</span>
                <span>${parseInt(totalCost.techFee).toLocaleString()}</span>
              </li>
              <li className='flex justify-between'>
                <span>IVA</span>
                <span>${parseInt(totalCost.iva).toLocaleString()}</span>
              </li>
              <li className='flex font-semibold justify-between border-t border-gray-400 mt-4 pt-4'>
                <span>Total</span>
                <span>${parseInt(totalCost.total).toLocaleString()}</span>
              </li>
            </ul>

            <button type="button" className="mt-4 text-sm text-gray-600 underline">Reportar este anuncio</button>
          </aside>
        </div>

        {/* Reviews section - unchanged */}
        <div>
          {/* Reviews */}
          <section className="mt-8 flex flex-col gap-16">
            <div className="grid md:grid-cols-2 gap-2 gap-x-12">
            <h2 className="font-semibold col-span-2 text-lg mb-4">⭐ 4.8 · 7 reseñas</h2>
              <div className='flex flex-col gap-4'>
                <p className="text-sm flex justify-between">
                  <span>
                  Limpieza
                  </span>
                  <span className="font-semibold">5.0</span>
                </p>
                <p className="text-sm flex justify-between">
                  <span>
                    Calidad del Mobiliario
                  </span>
                  <span className="font-semibold">5.0</span>
                </p>
                <p className="text-sm flex justify-between">
                  <span>
                    Conectividad
                  </span>
                  <span className="font-semibold">5.0</span>
                </p>
              </div>
              <div className='flex flex-col gap-4'>
                <p className="text-sm flex justify-between">
                  <span>
                    Equipamiento tecnológico
                  </span>
                  <span className="font-semibold">5.0</span>
                </p>
                <p className="text-sm flex justify-between">
                  <span>
                    Valor
                  </span>
                  <span className="font-semibold">5.0</span>
                </p>
                <p className="text-sm flex justify-between">
                  <span>
                    Privacidad acústica
                  </span>
                  <span className="font-semibold">5.0</span>
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["Jose", "Luke", "Shayna", "Josh"].map((name, i) => (
                <div key={i} className="bg-white shadow rounded-lg p-4">
                  <div className="flex items-center space-x-4 mb-2">
                    <img src="/user.jpg" className="size-10 rounded-full" alt="" />
                    <div>
                      <h4 className="font-semibold text-sm">{name}</h4>
                      <p className="text-xs text-gray-500">{i < 2 ? 'Diciembre 2021' : 'Noviembre 2021'}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Cómoda y bien equipada. Perfecta para reuniones pequeñas.</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
