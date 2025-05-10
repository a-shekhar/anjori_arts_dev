import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { X } from "lucide-react";

// Sidebar styles
const linkStyle = ({ isActive }) =>
  `block px-4 py-2 rounded ${
    isActive ? "bg-purple-600 text-white" : "text-gray-700 hover:bg-purple-100"
  }`;

const subLinkStyle = ({ isActive }) =>
  `block px-4 py-1 ml-4 text-sm rounded ${
    isActive ? "bg-purple-500 text-white" : "text-gray-600 hover:bg-purple-100"
  }`;

export default function AdminSidebar({ isOpen, onClose }) {
  const location = useLocation();

  // Auto-close on route change (mobile only)
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  return (
    <div
      className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-white border-r p-4 shadow-md md:shadow-none transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      {/* Mobile Header */}
      <div className="flex justify-between items-center mb-4 md:hidden">
        <h2 className="text-xl font-semibold">Admin</h2>
        <button onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {/* Desktop Sidebar Title */}
      <h2 className="text-2xl font-semibold mb-6 hidden md:block">Admin Panel</h2>

      <nav className="space-y-2">
        <NavLink to="/admin/dashboard" className={linkStyle}>Dashboard</NavLink>
        <NavLink to="/admin/users" className={linkStyle}>Users</NavLink>
        <NavLink to="/admin/orders" className={linkStyle}>Orders</NavLink>

        <div>
          <p className="text-sm font-semibold text-gray-500 px-4 mt-4">Artworks</p>
          <NavLink to="/admin/artworks/add" className={subLinkStyle}>➤ Add Artwork</NavLink>
          <NavLink to="/admin/artworks/manage" className={subLinkStyle}>➤ Manage Artwork</NavLink>
        </div>

        <NavLink to="/admin/custom-orders" className={linkStyle}>Custom Orders</NavLink>
        <NavLink to="/admin/settings" className={linkStyle}>Settings</NavLink>
      </nav>
    </div>
  );
}
