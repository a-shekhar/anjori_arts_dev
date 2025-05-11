import { Menu } from "lucide-react";

const AdminTopBar = ({ onMenuClick }) => {
  return (
    <header className="w-full bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between">
      {/* Logo + Title */}
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Anjori Arts Logo" className="h-8 w-8 rounded-full" />
        <h1 className="text-lg font-semibold text-gray-800">Anjori Arts</h1>
      </div>

      {/* Mobile Only Hamburger */}
      <button
        onClick={onMenuClick}
        className="md:hidden bg-gray-100 p-2 rounded hover:bg-gray-200"
        aria-label="Open Sidebar"
      >
        <Menu size={20} />
      </button>
    </header>
  );
};

export default AdminTopBar;