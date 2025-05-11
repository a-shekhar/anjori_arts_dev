import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import { showMessage } from './utils/toast';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Admin from "./layout/Admin"
import AddArtwork from "./pages/admin/AddArtwork"
import AdminHome from "./pages/admin/AdminHome"
import ShopPage from "./pages/Shop"

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopPage />} />
        {/* Admin Routes with Layout */}
        <Route path="/admin" element={<Admin />}>
          <Route index element={<AdminHome />} />                // shows on /admin
          <Route path="artworks/add" element={<AddArtwork />} />
          <Route path="artworks/manage" element={<NotFound />} /> {/* Placeholder for now */}
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
       {/* Toast */}
       <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
