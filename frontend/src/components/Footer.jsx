import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-16 px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-700">
      <div className='mr-24'>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu est in libero dignissim ultricies et eget lectus. Integer et consequat dui, eget hendrerit libero.</p>
        <div className="flex space-x-2 mt-2 text-xl text-teal-600">
          <i className="ti ti-brand-facebook-filled"></i>
          <i className="ti ti-brand-instagram-filled"></i>
          <i className="ti ti-brand-google-filled"></i>
        </div>
      </div>
      <div className="">
        <h3 className="font-bold mb-2 text-teal-600">Inicio</h3>
        <ul>
          <li>Reserva</li>
          <li>Artículos</li>
          <li>Ubicación</li>
          <li>Contacto</li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold mb-2 text-teal-600">Ayuda</h3>
        <ul>
          <li>Sobre nosotros</li>
          <li>Centro de ayuda</li>
          <li>Políticas de privacidad</li>
          <li>PQRs</li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold mb-2 text-teal-600">Obtener la app</h3>
        <ul>
          <li>App de iOS</li>
          <li>App de Android</li>
        </ul>
      </div>
    </footer>
  );
}
