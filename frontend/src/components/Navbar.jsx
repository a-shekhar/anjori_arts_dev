import React, { useState } from "react";
import { Menu, X, Lock } from "lucide-react";
import ImageZoomModal from "./ImageZoomModal";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
      { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Custom Order", href: "/custom-order" },
    { name: "About Us", href: "/about-us" },
    { name: "Admin", href: "/admin" },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Brand */}
        <div className="flex items-center space-x-3">
          <ImageZoomModal
            src="/images/logo.png"
            alt="Anjori Arts Logo"
            className="w-10 h-10 object-contain rounded hover:scale-105 transition-transform duration-300"
          />
          <Link to="/" className="text-xl font-semibold text-gray-900">Anjori Arts</Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="hover:text-purple-600 transition">
              {link.name}
            </a>
          ))}
          <a
            href="/login"
            className="inline-flex items-center space-x-1 px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition"
          >
            <Lock size={16} className="text-yellow-500" />
            <span>Login</span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white shadow">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="block text-gray-700 hover:text-purple-600 font-medium"
            >
              {link.name}
            </a>
          ))}
          <a
            href="/login"
            className="flex items-center space-x-2 text-gray-700 hover:text-purple-600"
          >
            <Lock size={16} className="text-yellow-500" />
            <span>Login</span>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
