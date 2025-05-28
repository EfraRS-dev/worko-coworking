import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status when component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <header className="flex justify-between items-center px-8 py-4">
      <div className="text-2xl font-bold text-[#24AB70]">Worko</div>

      <nav className="space-x-6 text-gray-700 font-medium">
        <Link to="/landing" className="hover:text-[#24AB70]">Inicio</Link>
        <Link to="/spaces" className="hover:text-[#24AB70]">Espacios</Link>
        <Link to="/booked" className="hover:text-[#24AB70]">Reservas</Link>
        <Link to="" className="hover:text-[#24AB70]">Recursos</Link>
        <Link to="" className="hover:text-[#24AB70]">Sobre nosotros</Link>
        <Link to="" className="hover:text-[#24AB70]">Contáctanos</Link>
      </nav>
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition-colors"
        >
          Salir
        </button>
      ) : (
        <Link to="/login">
          <button className="bg-[#24AB70] text-white px-5 py-2 rounded-full hover:bg-[#1e8f5e] transition-colors">
            Iniciar sesión
          </button>
        </Link>
      )}
    </header>
  );
}
