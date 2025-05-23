import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Brush,
  ChevronDown,
  ChevronUp,
  Settings,
  PlusCircle,
  List,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const { pathname } = useLocation();
  const [artworkMenuOpen, setArtworkMenuOpen] = useState(true);

  const isActive = (path) => pathname === path;
  const handleNavClick = () => setIsOpen(false);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-full bg-white border-r shadow-md transform transition-transform duration-300 w-[250px]
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <img src="/favicon.ico" alt="Logo" className="h-8 w-8 rounded-full" />
            <h1 className="text-lg font-bold">Anjori Arts</h1>
          </div>

          <nav className="space-y-2 text-sm">


            <Link
              to="/admin/dashboard"
              onClick={handleNavClick}
              className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 ${
                isActive("/admin/dashboard") ? "bg-violet-100 text-violet-700 font-semibold" : ""
              }`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            {/* Artworks Menu */}
            <div>
              <button
                onClick={() => setArtworkMenuOpen((prev) => !prev)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100"
              >
                <span className="flex items-center gap-2">
                  <Brush size={18} />
                  Artworks
                </span>
                {artworkMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {artworkMenuOpen && (
                <div className="ml-6 mt-1 space-y-1">
                  <Link
                    to="/admin/artworks/add"
                    onClick={handleNavClick}
                    className={`flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 ${
                      isActive("/admin/artworks/add") ? "bg-violet-100 text-violet-700 font-medium" : ""
                    }`}
                  >
                    <PlusCircle size={16} />
                    Add Artwork
                  </Link>
                  <Link
                    to="/admin/artworks/manage"
                    onClick={handleNavClick}
                    className={`flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 ${
                      isActive("/admin/artworks/manage") ? "bg-violet-100 text-violet-700 font-medium" : ""
                    }`}
                  >
                    <List size={16} />
                    Manage Artwork
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/admin/custom-orders"
              onClick={handleNavClick}
              className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 ${
                isActive("/admin/custom-orders") ? "bg-violet-100 text-violet-700 font-semibold" : ""
              }`}
            >
              <Mail size={18} />
              Custom Orders
            </Link>

            <Link
              to="/admin/orders"
              onClick={handleNavClick}
              className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 ${
                isActive("/admin/orders") ? "bg-violet-100 text-violet-700 font-semibold" : ""
              }`}
            >
              <ShoppingCart size={18} />
              Orders
            </Link>

            <Link
              to="/admin/users"
              onClick={handleNavClick}
              className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 ${
                isActive("/admin/users") ? "bg-violet-100 text-violet-700 font-semibold" : ""
              }`}
            >
              <Users size={18} />
              Users
            </Link>


            <Link
              to="/admin/settings"
              onClick={handleNavClick}
              className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 ${
                isActive("/admin/settings") ? "bg-violet-100 text-violet-700 font-semibold" : ""
              }`}
            >
              <Settings size={18} />
              Settings
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
