import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { showMessage } from '../../utils/toast';
import CountryCodeDropdown from '../../components/dropdowns/CountryCodeDropdown';
import { useLoading } from '../../components/context/LoadingContext'; // ✅ added

const OrderSummaryPage = () => {
  const location = useLocation();
  const { artworkId } = location.state || {};
  const { setUploadProgress } = useLoading(); // ✅ Only progress bar

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    countryCode: '+91',
    phoneNo: '',
    email: '',
    artworkId: artworkId,
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
      setUploadProgress(10); // Start progress

      const response = await fetch('/api/order/confirm-now', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      setUploadProgress(70);

      const result = await response.json();
      setUploadProgress(90);

      if (response.ok && result.success) {
        showMessage('success', result.message || 'Request submitted successfully!');
      } else {
        showMessage('error', result.message || 'Request could not proceed.');
      }
    } catch (err) {
      showMessage('error', 'Could not submit request.');
    } finally {
      setUploadProgress(100);
      setTimeout(() => setUploadProgress(0), 400); // Reset after short delay
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-start justify-center px-4 md:px-16 py-12 bg-gray-50 max-w-[1200px] mx-auto gap-10">
      <div className="hidden md:flex md:w-1/2 justify-center">
        <img
          src="/images/order-summary-1.png"
          alt="Artistic Illustration"
          className="max-h-[600px] w-auto rounded-xl shadow-lg object-contain"
        />
      </div>

      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg">
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryPage;
