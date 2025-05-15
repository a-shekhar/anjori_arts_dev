import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User, Lock, ChevronDown } from 'lucide-react';

export default function ProfileDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const toggleDropdown = () => setOpen(!open);

  if (!user) {
    return (
      <a
        href="/login"
        className="inline-flex items-center space-x-1 px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition"
      >
        <Lock size={16} className="text-yellow-500" />
        <span>Login</span>
      </a>
    );
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition border border-gray-200"
      >
        <img
          src={user.profileImageUrl || '/images/default-profile.png'} // fallback if no profile image
          alt="Profile"
          className="w-7 h-7 rounded-full object-cover"
        />
        <span className="text-sm text-gray-800 font-medium">Hi, {user.firstName}</span>
        <ChevronDown size={16} className="text-gray-500" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-20">
          <div className="py-2 text-sm">
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-pink-100 font-medium"
              onClick={() => setOpen(false)}
            >
              <User size={16} /> Profile
            </Link>
            <button
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-red-100 font-medium"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
