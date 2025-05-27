import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Landing() {
  return (
    <div id='landing' className="font-sans">
      <Header />

      <main className="px-8">
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-6 items-center py-16">
          <div>
            <h2 className="text-4xl font-bold mb-4">Encuentra tu espacio ideal</h2>
            <p className="mb-4 text-gray-600">Explora y reserva espacios de trabajo, salas de reuniones y equipos tecnológicos según tus necesidades.</p>
            <button className="flex items-center text-green-500 font-semibold mb-6">
              ▶ Watch video
            </button>
            <div className="bg-white shadow rounded-full flex items-center px-4 py-2 space-x-4">
              <span>Día</span>
              <span>Time in</span>
              <span>Time out</span>
              <span>Capacidad</span>
              <input type="text" placeholder="Buscar..." className="ml-auto px-3 py-1 border rounded-full" />
            </div>
          </div>
          <img src="/landing-bg.png" alt="Espacio" className="rounded-xl shadow-lg" />
        </section>

        {/* Espacios Populares */}
        <section className="py-16">
          <h3 className="text-2xl font-bold mb-2">Nuestras Salas y Espacios más populares</h3>
          <p className="text-gray-600 mb-6">Lorem ipsum es dummy text...</p>
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
        <section className="py-16">
          <h3 className="text-2xl font-bold mb-4">Te ofrecemos lo mejor en servicios</h3>
          <p className="text-gray-600 mb-8">Disfruta una experiencia personalizada...</p>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {["Cabinas", "Parqueaderos", "Zonas de descanso", "Wifi Alta velocidad", "Tomas de carga", "Seguridad", "Climatización", "Otros"].map((s, i) => (
              <div key={i} className="p-4 border rounded-xl text-center text-sm hover:bg-green-50">
                <div className="text-green-500 text-xl mb-2">⬤</div>
                {s}
              </div>
            ))}
          </div>
        </section>

        {/* Sobre Nosotros */}
        <section className="py-16 grid md:grid-cols-2 gap-12 items-center">
          <img src="/img/logo.png" alt="Perfect Place Logo" className="w-48 mx-auto md:mx-0" />
          <div>
            <h3 className="text-xl font-bold mb-2">Sobre Nosotros</h3>
            <p className="text-gray-600 mb-4">En Nombre de la empresa creemos en el poder de los espacios...</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600">Leer Más</button>
          </div>
        </section>

        {/* Testimonios */}
        <section className="py-16">
          <h3 className="text-2xl font-bold mb-4">Our Testimonials</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["Charlie Brown", "Cameron Williamson", "Darrell Steward", "Eleanor Pena"].map((name, i) => (
              <div key={i} className="bg-white shadow rounded-lg p-4">
                <div className="flex items-center space-x-4 mb-2">
                  <img src="/user.jpg" className="size-10 rounded-full" alt="" />
                  <div>
                    <h4 className="font-semibold text-sm">{name}</h4>
                    <p className="text-xs text-gray-500">{i % 2 === 0 ? 'Marketing Coordinator' : 'Web Designer'}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Great Work! Increíble experiencia...</p>
                <div className="text-yellow-400 mt-2">★★★★☆ 4.8</div>
              </div>
            ))}
          </div>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="py-16">
          <h3 className="text-2xl font-bold mb-4">
            <span className="text-green-500">Preguntas</span> Más Frecuentes
          </h3>
          <p className="text-sm text-gray-500 mb-6">Puedes reservar 7 días a la semana de 8am a 11pm.</p>
          <div className="space-y-4">
            {["¿Necesito Reservar Con Anticipación?", "¿Puedo alquilar salas o equipos por separado?", "¿Puedo cancelar o cambiar una reserva?"]
              .map((q, i) => (
                <details key={i} className="border rounded-lg p-4">
                  <summary className="cursor-pointer font-medium">{q}</summary>
                  <p className="mt-2 text-sm text-gray-600">Respuesta ejemplo a la pregunta frecuente.</p>
                </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
