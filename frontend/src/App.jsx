import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Admin from "./layout/Admin";
import ShopPage from "./pages/Shop";
import CustomOrderPage from "./pages/CustomOrder";
import AboutPage from "./pages/About";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ProfilePage from "./pages/Profile";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";
import NotFound from "./components/NotFound";

import PageLoader from "./components/Loader/PageLoader";         // 🎨 Full-page loader
import ProgressBar from "./components/Loader/ProgressBar";       // 📶 Top progress bar
import AutoHideLoader from "./components/Loader/AutoHideLoader"; // 🧼 Auto-reset on route change
import { LoadingProvider } from "./components/context/LoadingContext"; // 🌐 Global loading state
import OrderSummaryPage from "./pages/payment/OrderSummary"
import OrderConfirmedPageWrapper from './pages/payment/OrderConfirmedPageWrapper';

// admin pages
import AdminHome from "./pages/admin/AdminHome";
import AddArtwork from "./pages/admin/AddArtwork";
import ManageArtworksPage from "./pages/admin/ManageArtworks";
import ArtworkDetailPage from "./pages/admin/ArtworkDetailPage";
import ManageCustomOrdersPage from "./pages/admin/ManageCustomOrders";
import ManageOrdersPage from "./pages/admin/ManageOrders";



function App() {
  return (
    <LoadingProvider>
      <Router>
        <AutoHideLoader />
        <PageLoader />
        <ProgressBar />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/custom-order" element={<CustomOrderPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/about-us" element={<AboutPage />} />

          {/* Order related pages */}
          <Route path="/order-summary" element={<OrderSummaryPage />} />
          <Route path="/order-confirmed" element={<OrderConfirmedPageWrapper />} />



          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminHome />} />
            <Route path="artworks/add" element={<AddArtwork />} />
            <Route path="artworks/manage" element={<ManageArtworksPage />} />
            <Route path="/admin/artworks/:id" element={<ArtworkDetailPage />} />
            <Route path="custom-orders" element={<ManageCustomOrdersPage />} />
             <Route path="orders" element={<ManageOrdersPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer className="mt-auto" />
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </LoadingProvider>
  );
}

export default App;
