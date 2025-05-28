import React, { useState } from 'react';

export default function PasswordInput({ onChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    // Call the parent's onChange handler with the new value
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={handleChange}
        placeholder="Enter your password"
        className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10"
        required
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-2.5 text-gray-600 hover:text-black"
      >
        {showPassword ? (
          // Ojo abierto (visible)
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
               viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        ) : (
          // Ojo tachado (oculto)
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
               viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.973 9.973 0 012.204-3.592m3.19-2.314A9.953 9.953 0 0112 5c4.477 0 8.267 2.943 9.542 7a9.973 9.973 0 01-1.357 2.592M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 3l18 18" />
          </svg>
        )}
      </button>
    </div>
  );
}
