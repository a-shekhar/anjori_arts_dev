import React from "react";
import { showMessage } from '../utils/toast';
import { ToastContainer } from 'react-toastify';
import AdminSidebar from '../components/AdminSidebar'
import { Outlet } from "react-router-dom";




const AdminConsole = () => {
  return (
      <>
      <div className="flex h-screen">
        <AdminSidebar />

        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <Outlet /> {/* Render nested routes like Artworks, Users, etc. */}
        </main>
      </div>

        {/* Toast */}
        <ToastContainer />
      </>
    );
};

export default AdminConsole;
