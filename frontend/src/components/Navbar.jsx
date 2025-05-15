import { useState } from "react";
import { Menu, X } from "lucide-react";
import ImageZoomModal from "./ImageZoomModal";
import { Link, useNavigate } from "react-router-dom";
import ProfileDropdown from './ProfileDropdown';
import { API_BASE_URL } from "../utils/api";
import { useAuth } from "../components/AuthContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, setUser, loading } = useAuth(); // ✅ now includes loading
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
      alert('Logout failed');
    }
  };

  // ⛔ Don’t show navbar profile section until user fetch completes
  if (loading) return null;

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
          <ProfileDropdown user={user} onLogout={handleLogout} />
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
          <ProfileDropdown user={user} onLogout={handleLogout} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
