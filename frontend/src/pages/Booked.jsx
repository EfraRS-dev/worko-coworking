// src/Spaces.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';

const Booked = () => {
  return (
    <>
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filtros superiores */}
        <section className="flex shadow-md col-span-4 bg-white rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 rounded-r-none">
            <div className="px-6 my-3">
              <label className="flex gap-2 text-teal-800 font-semibold"><i className="ti ti-calendar-week-filled text-2xl"></i>Día</label>
              <input type="date" className="" defaultValue="2021-06-10" />
            </div>
            <div className="px-4 my-3 border-l border-gray-400">
              <label className="flex gap-2 text-teal-800 font-semibold"><i className="ti ti-clock-hour-7-filled text-2xl"></i>Hora ingreso</label>
              <input type="time" className="" defaultValue="10:00" />
            </div>
            <div className="px-4 my-3 border-l border-gray-400">
              <label className="flex gap-2 text-teal-800 font-semibold"><i className="ti ti-clock-hour-7-filled text-2xl"></i>Hora salida</label>
              <input type="time" className="" defaultValue="12:00" />
            </div>
            <div className="px-4 my-3 border-l border-gray-400">
              <label className="flex gap-2 text-teal-800 font-semibold"><i className="ti ti-user-filled text-2xl"></i>Capacidad</label>
              <input type="number" className="" defaultValue={4} min={1} />
            </div>
          </div>
          <button className="cursor-pointer text-xl bg-teal-600 text-white rounded-xl rounded-l-none px-12 w-full md:w-auto flex items-center gap-2">
            <i className="ti ti-search"></i>Buscar
          </button>
        </section>
        {/* Filtros */}
        <aside className="lg:col-span-1 space-y-6">
          <div>
            <h2 className="font-semibold text-2xl mb-4">Filtrar Por</h2>
            <h3 className="font-semibold text-base">Tu Presupuesto Por Hora</h3>
            <div className="flex space-x-2 mt-2">
              <input type="number" placeholder="Min Price" className="w-full border rounded px-2 py-1" />
              <input type="number" placeholder="Max Price" className="w-full border rounded px-2 py-1" />
            </div>
          </div>

          {[
            "Tipo De Espacio",
            "Servicios Incluidos",
            "Tipo De Ambiente",
            "Nivel De Ruido",
            "Cancelación",
            "Tipo De Vista",
            "Calificación",
            "Tipo De Mobiliario",
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

          {/* Lista de espacios */}
          {[
            {
              title: "La Junta",
              subtitle: "Sala de Reuniones",
              price: 80000,
              image: "room1.png",
            },
            {
              title: "Rincón Productivo",
              subtitle: "Sala de Trabajo",
              price: 120000,
              image: "room2.png",
            },
            {
              title: "Mente Colectiva",
              subtitle: "Sala de Reuniones",
              price: 50000,
              image: "room3.png",
            },
            {
              title: "Torre de Ideas",
              subtitle: "Sala de Reuniones",
              price: 50000,
              image: "room1.png",
            },
            {
              title: "Rincón de Acción",
              subtitle: "Sala de Reuniones",
              price: 40000,
              image: "room2.png",
            },
            {
              title: "Inspiración Constante",
              subtitle: "Sala de Estudio",
              price: 20000,
              image: "room3.png",
            },
          ].map((space, idx) => (
            <Link to="/bookings" key={idx} className="flex rounded overflow-hidden shadow-md">
              <img src={space.image} alt={space.title} className="w-40 h-40 object-cover flex-shrink-0" />
              <div className="p-4 flex flex-col justify-between w-full">
                <div>
                  <h3 className="text-gray-600 text-sm">{space.subtitle}</h3>
                  <p className="text-xl">{space.title}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Wifi • Silencioso • Aire Acondicionado
                  </p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">5.0 ⭐ (318 reviews)</span>
                  <span className="text-gray-500">
                    ${space.price.toLocaleString()}
                    <span className="text-sm">
                      /Hora
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}

          <div className="text-center">
            <button className="bg-teal-600 text-white px-6 py-2 rounded mt-4">
              Más resultados <i className="ti ti-chevron-right"></i>
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Booked;
