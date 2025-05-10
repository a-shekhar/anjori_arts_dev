import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { Menu } from "lucide-react";

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Top bar for mobile */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-white">
        <h1 className="text-xl font-bold">Admin</h1>
        <button onClick={() => setSidebarOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      <div className="flex h-screen overflow-hidden">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </>
  );
}
