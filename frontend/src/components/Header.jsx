import React from 'react';

export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-4">
      <div></div>
      <nav className="space-x-6 text-gray-700 font-medium">
        <a href="#" className="hover:text-[#24AB70]">Home</a>
        <a href="#" className="hover:text-[#24AB70]">Espacios</a>
        <a href="#" className="hover:text-[#24AB70]">Recursos</a>
        <a href="#" className="hover:text-[#24AB70]">About Us</a>
        <a href="#" className="hover:text-[#24AB70]">Contáctanos</a>
      </nav>
      <button className="bg-[#24AB70] text-white px-5 py-2 rounded-full hover:bg-[#34BB80] hover:cursor-pointer">Login</button>
    </header>
  );
}
