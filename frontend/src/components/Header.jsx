import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-4">
      <div></div>
      <nav className="space-x-6 text-gray-700 font-medium">
        <Link to="/landing" className="hover:text-[#24AB70]">Inicio</Link>
        <Link to="/spaces" className="hover:text-[#24AB70]">Espacios</Link>
        <Link to="/booked" className="hover:text-[#24AB70]">Reservas</Link>
        <Link to="" className="hover:text-[#24AB70]">Recursos</Link>
        <Link to="" className="hover:text-[#24AB70]">Sobre nosotros</Link>
        <Link to="" className="hover:text-[#24AB70]">Contáctanos</Link>
      </nav>
      <Link to="/">
        <button className="bg-teal-600 text-white px-5 py-2 rounded-full hover:cursor-pointer">
          Iniciar sesión
        </button>
      </Link>
    </header>
  );
}
