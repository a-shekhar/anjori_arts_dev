import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function AdminSidebar() {
  const [openArtworks, setOpenArtworks] = useState(false);

  const toggleArtworks = () => setOpenArtworks(!openArtworks);

  return (
    <div className="w-64 h-screen bg-white border-r p-4">
      <h2 className="text-2xl font-semibold mb-6">Admin Panel</h2>
      <nav className="space-y-2">

        {/* Artworks group */}
        <div>
          <button
            onClick={toggleArtworks}
            className="flex justify-between items-center w-full px-4 py-2 rounded hover:bg-purple-100 text-gray-700"
          >
            <span>Artworks</span>
            {openArtworks ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {openArtworks && (
            <div className="ml-4 mt-1 space-y-1">
              <NavLink to="/admin/artworks/add" className={subLinkStyle}>
                ➤ Add Artwork
              </NavLink>
              <NavLink to="/admin/artworks/manage" className={subLinkStyle}>
                ➤ Manage Artwork
              </NavLink>
            </div>
          )}
        </div>
        <NavLink to="/admin/settings" className={linkStyle}>Settings</NavLink>
      </nav>
    </div>
  );
}

const linkStyle = ({ isActive }) =>
  `block px-4 py-2 rounded ${
    isActive ? "bg-purple-600 text-white" : "text-gray-700 hover:bg-purple-100"
  }`;

const subLinkStyle = ({ isActive }) =>
  `block px-4 py-1 rounded text-sm ${
    isActive ? "bg-purple-500 text-white" : "text-gray-600 hover:bg-purple-100"
  }`;
