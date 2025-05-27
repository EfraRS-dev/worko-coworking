import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-16 px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-700">
      <div>
        <p>Lorem ipsum is simply dummy text of the printing and typesetting industry.</p>
        <div className="flex space-x-2 mt-2">
          <i className="ti ti-brand-facebook-filled"></i>
          <i className="ti ti-brand-instagram-filled"></i>
          <i className="ti ti-brand-google-filled"></i>
        </div>
      </div>
      <div>
        <h3 className="font-bold mb-2">Home</h3>
        <ul>
          <li>Booking</li>
          <li>Articles</li>
          <li>Location</li>
          <li>Contact</li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold mb-2">Help</h3>
        <ul>
          <li>About us</li>
          <li>Help center</li>
          <li>Privacy policy</li>
          <li>FAQs</li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold mb-2">Get the app</h3>
        <ul>
          <li>iOS app</li>
          <li>Android app</li>
        </ul>
      </div>
    </footer>
  );
}
