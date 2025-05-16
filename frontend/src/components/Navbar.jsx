import { useState } from "react";
import { Menu, X, Home, ShoppingBag, Brush, Info, User, ShieldCheck } from "lucide-react";
import ImageZoomModal from "./ImageZoomModal";
import { Link, useNavigate } from "react-router-dom";
import ProfileDropdown from './ProfileDropdown';
import { useAuth } from "../components/AuthContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, setUser, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('/logout', {
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

  if (loading) return null;

  const isAdmin = user?.role === 'ROLE_ADMIN';

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "Shop", href: "/shop", icon: <ShoppingBag size={18} /> },
    { name: "Custom Order", href: "/custom-order", icon: <Brush size={18} /> },
    ...(isAdmin ? [{ name: "Admin", href: "/admin", icon: <ShieldCheck size={18} /> }] : []),
    { name: "About Us", href: "/about-us", icon: <Info size={18} /> },
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
            <Link key={link.name} to={link.href} className="hover:text-purple-600 transition">
              {link.name}
            </Link>
          ))}
          <ProfileDropdown user={user} onLogout={handleLogout} />
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu: Slide-In from Right */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sidebar Panel */}
          <div className="fixed top-0 right-0 w-64 h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0">
            <div className="p-5 space-y-4">
              {/* Close Button */}
              <div className="flex justify-end">
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              {/* Nav Links (except About Us) */}
              {navLinks.filter(link => link.name !== "About Us").map(link => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-center gap-2 text-gray-800 font-medium hover:text-purple-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}

              {/* About Us — Always Last in nav group */}
              {navLinks.find(link => link.name === "About Us") && (
                <Link
                  to="/about-us"
                  className="flex items-center gap-2 text-gray-800 font-medium hover:text-purple-600 pt-2 border-t border-gray-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Info size={18} />
                  About Us
                </Link>
              )}

              {/* ✅ Divider before auth actions */}
              <hr className="border-t border-gray-300 my-2" />

              {/* Auth Section */}
              {!user ? (
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-gray-800 font-medium hover:text-purple-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User size={18} />
                  Login
                </Link>
              ) : (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-gray-800 font-medium hover:text-purple-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={18} />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left flex items-center gap-2 text-red-600 font-medium hover:text-red-700"
                  >
                    <X size={18} />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
