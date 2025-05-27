import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Bookings() {
  return (
    <div className="min-h-screen font-sans text-gray-900">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="px-8 py-12 gap-8 flex flex-col max-w-7xl mx-auto">
        {/* Left column */}
        <div className="">
          <h1 className="text-2xl font-semibold mb-2">Sala: Mente Maestra</h1>
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

        <div class="grid grid-cols-6 gap-8">
          <div class="col-span-4">
            {/* Description */}
            <section className="mt-6">
              <h2 className="font-semibold text-lg mb-2">Sala de Reuniones</h2>
              <p className="text-gray-600 text-sm mb-4">
                8 personas · Sala privada · Ruido silencioso · Escritorio Compartido
              </p>
              <p className="text-gray-700">
                Espacio ideal para equipos pequeños, entrevistas o reuniones ejecutivas. Esta sala cuenta con capacidad máxima para 8 personas, vista exterior que aporta luz natural, lockers individuales para mayor seguridad y almacenamiento, y un ambiente totalmente privado para garantizar la confidencialidad de tus conversaciones. Equipada con mobiliario ergonómico, televisor y acceso a Wi-Fi de alta velocidad.
              </p>
            </section>

            {/* Amenities */}
            <section className="mt-6">
              <h2 className="font-semibold text-lg mb-2">Servicios Ofrecidos con la Sala</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm text-gray-700">
                <span className="flex gap-2"><i class="ti ti-check text-xl"></i> Vista Exterior</span>
                <span className="flex gap-2"><i class="ti ti-check text-xl"></i> Café o Snacks Incluidos</span>
                <span className="flex gap-2"><i class="ti ti-check text-xl"></i> Wifi</span>
                <span className="flex gap-2"><i class="ti ti-check text-xl"></i> Seguridad en la Sala</span>
                <span className="flex gap-2"><i class="ti ti-check text-xl"></i> Televisor</span>
                <span className="flex gap-2"><i class="ti ti-check text-xl"></i> Lockers</span>
                <span className="flex gap-2"><i class="ti ti-check text-xl"></i> Aire Acondicionado</span>
              </div>
            </section>
          </div>

          {/* Right column - Reservation */}
          <aside className="flex flex-col gap-2 col-span-2 border rounded-xl p-6 shadow-sm h-fit">
            <p className="text-xl font-semibold">$25.000 <span className="text-base font-normal">/ Hora</span></p>
            <p className="text-sm text-gray-500">⭐ 4.8 · 7 reseñas</p>

            <div className="mt-4">
              <div className="grid grid-cols-2">
                <div className="border rounded-t-xl rounded-r-none rounded-b-none">
                  <label className="text-sm font-medium block p-2 pb-0">TIME-IN</label>
                  <input type="time" defaultValue="08:00" className="w-full p-2 pt-0" />
                </div>

                <div className="border rounded-t-xl rounded-l-none rounded-b-none">
                  <label className="text-sm font-medium block p-2 pb-0">TIME-OUT</label>
                  <input type="time" defaultValue="12:00" className="w-full p-2 pt-0" />
                </div>

                <div className="col-span-2 border rounded-b-xl rounded-t-none">
                  <label className="text-xs font-medium block p-2 pb-0">DÍA</label>
                  <input type="date" defaultValue="2025-10-02" className="text-sm w-full p-2 pt-0" />
                </div>
              </div>

              <button className="bg-green-600 mt-4 text-white w-full py-2 rounded hover:bg-green-700 transition">Reservar</button>

              <span className="flex font-medium justify-center text-sm text-gray-400">Detalles del Pago</span>
              <ul className="mt-2 space-y-1">
                <li className='flex justify-between'>
                  <span>$25.000 x 4 Horas</span>
                  <span>$100.000</span>
                </li>
                <li className='flex justify-between'>
                  <span>Cargo por Limpieza</span>
                  <span>$10.000</span>
                </li>
                <li className='flex justify-between'>
                  <span>Cargo por Servicios</span>
                  <span>$5.000</span>
                </li>
                <li className='flex justify-between'>
                  <span>Mantenimiento Tecnológico</span>
                  <span>$8.000</span>
                </li>
                <li className='flex justify-between'>
                  <span>IVA</span>
                  <span>$23.370</span>
                </li>
                <li className='flex justify-between border-t border-gray-400 mt-4 pt-4'>
                  <span className="font-semibold">Total</span>
                  <span>$146.370</span>
                </li>
              </ul>

            </div>
              <button className="mt-4 text-sm text-gray-600 underline">Reportar este anuncio</button>
          </aside>

        </div>
        <div>
          {/* Reviews */}
          <section className="mt-8 flex flex-col gap-8">
            <h2 className="font-semibold text-lg mb-4">⭐ 4.8 · 7 reseñas</h2>
            <div className="grid md:grid-cols-2 gap-16">
              <div className='flex flex-col gap-4'>
                <p className="text-sm flex justify-between">
                  <span>
                  Limpieza
                  </span>
                  <span>5.0</span>
                </p>
                <p className="text-sm flex justify-between">
                  <span>
                    Calidad del Mobiliario
                  </span>
                  <span>5.0</span>
                </p>
                <p className="text-sm flex justify-between">
                  <span>
                    Conectividad
                  </span>
                  <span>5.0</span>
                </p>
              </div>
              <div className='flex flex-col gap-4'>
                <p className="text-sm flex justify-between">
                  <span>
                    Equipamiento tecnológico
                  </span>
                  <span>5.0</span>
                </p>
                <p className="text-sm flex justify-between">
                  <span>
                    Valor
                  </span>
                  <span>5.0</span>
                </p>
                <p className="text-sm flex justify-between">
                  <span>
                    Privacidad acústica
                  </span>
                  <span>5.0</span>
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
                      <p className="text-xs text-gray-500">{i < 2 ? 'December 2021' : 'November 2021'}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Cómoda y bien equipada. Perfecta para reuniones pequeñas.</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
