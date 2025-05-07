import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 py-3 fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-pink-600">Anjori Arts</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-800 font-medium">
          <li><a href="#" className="hover:text-pink-600">Home</a></li>
          <li><a href="#" className="hover:text-pink-600">Shop</a></li>
          <li><a href="#" className="hover:text-pink-600">Contact</a></li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <ul className="md:hidden mt-2 bg-white shadow rounded text-gray-800 font-medium space-y-2 px-4 py-2">
          <li><a href="#" className="block hover:text-pink-600">Home</a></li>
          <li><a href="#" className="block hover:text-pink-600">Shop</a></li>
          <li><a href="#" className="block hover:text-pink-600">Contact</a></li>
        </ul>
      )}
    </nav>
  );
}
