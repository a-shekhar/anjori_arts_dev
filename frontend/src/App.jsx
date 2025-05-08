import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import { showMessage } from './utils/toast';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer"
import Home from "./pages/Home"

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Add your other routes here... */}
        <Route path="/" element={<Home/> } />
        {/* Catch-all for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
