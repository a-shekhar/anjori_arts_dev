import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Admin from "./layout/Admin";
import AddArtwork from "./pages/admin/AddArtwork";
import AdminHome from "./pages/admin/AdminHome";
import ShopPage from "./pages/Shop";
import CustomOrderPage from "./pages/CustomOrder";
import AboutPage from "./pages/About";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ProfilePage from "./pages/Profile";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";
import PageLoader from "./components/Loader/PageLoader"; // 👈 Artistic loader
import { LoadingProvider } from "./components/context/LoadingContext"; // 👈 Context provider

function App() {
  return (
    <LoadingProvider>
      <Router>
        <PageLoader /> {/* 👈 Loader displays above everything */}

        <Navbar />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/custom-order" element={<CustomOrderPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about-us" element={<AboutPage />} />

          {/* Admin Routes with Layout */}
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminHome />} />
            <Route path="artworks/add" element={<AddArtwork />} />
            <Route path="artworks/manage" element={<NotFound />} /> {/* Placeholder */}
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />

        {/* Toasts */}
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </LoadingProvider>
  );
}

export default App;
