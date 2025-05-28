import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Landing() {
  return (
    <div id='landing' className="font-sans">
      <Header />

      <main className="px-12">
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 items-center py-12 relative">
          <div className='w-full h-full'>
            <div className='bg-teal-50 p-12 h-full rounded-t-2xl rounded-b-none rounded-r-none'>
              <h2 className="text-5xl font-semibold mb-4">Encuentra tu espacio ideal</h2>
              <p className="mb-4 text-gray-600">Explora y reserva espacios de trabajo, salas de reuniones y equipos tecnológicos según tus necesidades.</p>
              <button className="flex items-center font-semibold text-teal-600 mb-6 gap-2">
                <i className="ti ti-player-play-filled bg-white p-2 rounded-full"></i> Ver video
              </button>
            </div>
          </div>
          <section className="flex shadow-md absolute bottom-24 right-16 bg-white rounded-full">
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
            <button className="cursor-pointer text-xl bg-teal-600 text-white rounded-full rounded-l-none px-12 w-full md:w-auto flex items-center gap-2">
              <i className="ti ti-search"></i>Buscar
            </button>
          </section>
          <img src="/landing-bg.png" alt="Espacio" className="w-full rounded-2xl rounded-b-none rounded-l-none shadow-lg" />
        </section>

        {/* Espacios Populares */}
        <section className="py-16">
          <h3 className="text-2xl font-bold mb-2">Nuestras Salas y Espacios más populares</h3>
          <p className="text-gray-600 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu est in libero dignissim ultricies et eget lectus. Integer et consequat dui, eget hendrerit libero. Fusce id sapien vitae diam iaculis aliquet a sed tellus. Donec lorem augue, condimentum eu mauris eu, consequat pulvinar mauris. In hac habitasse platea dictumst.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {['Mente Maestra', 'Buenas Decisiones', 'Refugio de Ideas'].map((name, idx) => (
              <div key={idx} className="bg-white shadow rounded-xl overflow-hidden">
                <img src={`/room${idx + 1}.png`} alt={name} />
                <div className="p-4">
                  <h4 className="font-semibold">Sala: {name}</h4>
                  <p className="text-sm text-gray-500">$25.000 / hora</p>
                  <div className="text-yellow-400">★★★★☆ 4.8</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Servicios */}
        <section className="py-16 grid grid-cols-4 gap-4">
          <div>
            <h3 className="text-2xl font-bold mb-4">Te ofrecemos lo mejor en servicios</h3>
            <p className="text-gray-600 mb-6">Disfruta de una experiencia completa pensada para potenciar tu trabajo, con servicios de alta calidad y atención a cada detalle.</p>
            <button className='bg-teal-500 text-white px-6 py-3 rounded-full'>Contactar</button>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 col-span-3">
            {["Espacios de trabajo privados", "Acceso a parqueaderos", "Zonas de descanso", "Wifi de Alta velocidad", "Tomas de carga Accesibles", "Seguridad continua", "Climatización adecuada", "Otros servicios"].map((s, i) => (
              <div key={i} className="p-6 border border-gray-400 shadow-sm rounded-xl text-center text-sm flex flex-col gap-2">
                <i className="ti ti-ad-circle text-5xl text-teal-600"></i>
                {s}
              </div>
            ))}
          </div>
        </section>

        {/* Sobre Nosotros */}
        <section className="py-16 grid md:grid-cols-3 items-center mr-16">
          <img src="/logo.png" alt="Perfect Place Logo" className="w-[400px] ml-auto rounded-2xl shadow-xl" />
          <div className="bg-teal-50 p-16 col-span-2 rounded-r-2xl">
            <h3 className="text-2xl font-bold mb-2">Sobre Nosotros</h3>
            <p className="text-gray-600 mb-4">En Worko, creemos en el poder de los espacios para inspirar ideas, conectar personas y transformar la manera de trabajar.</p>
            <p className="text-gray-600 mb-4">Más allá de oficinas compartidas, somos una comunidad que conecta talentos y fomenta el crecimiento conjunto. Creemos que un buen espacio de trabajo no solo se adapta a tus necesidades, sino que también te inspira a dar lo mejor de ti cada día.</p>
            <button className="cursor-pointer bg-teal-500 text-white px-4 py-2 rounded-full">Leer Más</button>
          </div>
        </section>

        {/* Testimonios */}
        <section className="py-16">
          <h3 className="text-2xl font-bold mb-4">Nuestros Testimonios</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["Charlie Brown", "Cameron Williamson", "Darrell Steward", "Eleanor Pena"].map((name, i) => (
              <div key={i} className="bg-white shadow rounded-lg p-4">
                <div className="flex items-center space-x-4 mb-2">
                  <img src="/user.jpg" className="size-10 rounded-full" alt="" />
                  <div>
                    <h4 className="font-semibold text-sm">{name}</h4>
                    <p className="text-xs text-gray-500">{i % 2 === 0 ? 'Coordinador de Mercadeo' : 'Diseñador Web'}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Gran Trabajo! Increíble experiencia...</p>
                <div className="text-yellow-400 mt-2">★★★★☆ 4.8</div>
              </div>
            ))}
          </div>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="py-16 grid grid-cols-3 w-full">
          <div>
            <h3 className="text-3xl font-bold mb-4">
              <span className="text-teal-600">Preguntas</span> Más Frecuentes
            </h3>
            <p className="text-sm text-gray-500 mb-6">Puedes reservar 7 días a la semana de 8am a 11pm.</p>
          </div>
          <div className="space-y-4 col-span-2">
            {["¿Necesito Reservar Con Anticipación?", "¿Puedo alquilar salas o equipos por separado?", "¿Puedo cancelar o cambiar una reserva?"]
              .map((q, i) => (
                <details key={i} className="border rounded-lg p-6">
                  <summary className="cursor-pointer font-medium">{q}</summary>
                  <p className="mt-4 text-sm text-gray-600">Sí, recomendamos reservar con anticipación para garantizar la disponibilidad del espacio o recurso que deseas. Puedes hacerlo fácilmente desde nuestra app o sitio web.</p>
                </details>
              ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
