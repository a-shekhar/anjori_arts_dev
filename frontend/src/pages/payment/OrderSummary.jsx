import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { showMessage } from '../../utils/toast';
import CountryCodeDropdown from '../../components/dropdowns/CountryCodeDropdown';
import { useLoading } from '../../components/context/LoadingContext';
import { useAuth } from '../../components/context/AuthContext'; // ✅ get user context
import { useNavigate } from "react-router-dom"

const OrderSummaryPage = () => {
  const location = useLocation();
  const { artwork } = location.state || {};
  const { setUploadProgress } = useLoading();
  const { user } = useAuth(); // ✅ get logged-in user
  const isGuest = !user;
  const navigate = useNavigate();



  // main artwork image
  const [mainImage] = useState(() => {
    if (artwork?.images?.length) {
      return artwork.images.find(img => img.main) || artwork.images[0];
    }
    return null;
  });

  // prefill form if user exists
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    countryCode: user?.countryCode || '+91',
    phoneNo: String(user?.phoneNo || ''),
    email: user?.email || '',
    artworkId: artwork?.id || null,
    userId: user?.userId || null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmNow = async (e) => {
    e.preventDefault();

    if (!formData.phoneNo.trim() || !formData.email.trim()) {
      showMessage('error', 'Phone number and email are required.');
      return;
    }

    try {
      setUploadProgress(10);

      const response = await fetch('/api/order/confirm-now', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      setUploadProgress(70);
      const result = await response.json();
      setUploadProgress(90);

      const orderId = result.data?.id;


      if (response.ok && result.success && orderId) {
        navigate('/order-confirmed', { state: { orderId } });
      } else {
        showMessage('error', result.message || 'Request could not proceed.');
      }

    } catch (err) {
      showMessage('error', 'Could not submit request.');
    } finally {
      setUploadProgress(100);
      setTimeout(() => setUploadProgress(0), 400);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-start justify-center px-4 md:px-16 py-12 bg-gray-50 max-w-[1200px] mx-auto gap-10">
      {/* LEFT ILLUSTRATION */}
      <div className="hidden md:flex md:w-1/2 justify-center">
        <img
          src="/images/order-summary-1.png"
          alt="Artistic Illustration"
          className="max-h-[600px] w-auto rounded-xl shadow-lg object-contain"
        />
      </div>

      {/* FORM */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg">
          {/* Artwork preview */}
          {artwork && (
            <div className="mb-6 text-center">
              <p className="text-sm text-gray-500">You're requesting:</p>
              <h2 className="text-lg font-semibold text-purple-600">{artwork.title}</h2>
              {mainImage && (
                <img
                  src={mainImage.imageUrl}
                  alt={artwork.title}
                  className="mt-2 max-h-52 mx-auto rounded-md shadow"
                />
              )}
            </div>
          )}

          <h1 className="text-2xl font-bold text-purple-600 mb-2 text-center">Request Artwork</h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Let us know how to contact you — we’ll handle the rest!
          </p>

          <form onSubmit={handleConfirmNow} className="space-y-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            />

            <div className="flex gap-2 w-full">
              <CountryCodeDropdown value={formData.countryCode} onChange={handleChange} />
              <input
                name="phoneNo"
                type="tel"
                value={formData.phoneNo}
                onChange={handleChange}
                placeholder="Phone"
                required
                className="border border-gray-300 rounded-md px-4 py-2 w-2/3 flex-1"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            />

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              Confirm Now
            </button>

            {isGuest && (
              <p className="text-xs text-gray-500 text-center mt-2 italic">
                Want to autofill the form, view your order history and track orders?{" "}
                <a href="/login" className="font-medium text-violet-600 hover:underline">
                  Login or Sign Up
                </a>{" "}
                for a more professional experience.
              </p>
            )}


          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryPage;
