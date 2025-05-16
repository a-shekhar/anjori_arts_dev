import React, { useState, useEffect } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import OtpModal from '../components/OtpModal';
import { useAuth } from '../components/AuthContext';
import PaintbrushLoader from '../components/PaintbrushLoader';

export default function SignupPage() {

   const { user, setUser, loading  } = useAuth(); // ✅ added user check

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    countryCode: '+91',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
        useEffect(() => {
          if (user) {
            navigate('/profile', { replace: true });
          }
        }, [user, navigate]);

     if (loading) return <PaintbrushLoader />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName || formData.firstName.length < 2)
      newErrors.firstName = 'First name must be at least 2 characters';
    if (!formData.lastName || formData.lastName.length < 2)
      newErrors.lastName = 'Last name must be at least 2 characters';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Invalid email address';
    if (formData.phoneNo && !/^\d{10}$/.test(formData.phoneNo))
      newErrors.phoneNo = 'Phone Number must be 10 digits';
    if (!formData.password || formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage(null);
    setSubmitting(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setShowOtpModal(true);
      } else {
        setMessage(result.message || 'Could not send OTP');
      }
    } catch (err) {
      setMessage('Internal Server Issue');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="hidden md:block">
          <img
            src="/images/Signup.png"
            alt="Signup art"
            className="w-full max-w-sm mx-auto"
          />
        </div>

        <div className="bg-[#fdfdfd] rounded-2xl shadow-md p-8 w-full">
          <h2 className="text-3xl font-semibold text-center text-purple-600 mb-2">Join Anjori Arts</h2>
          <p className="text-center text-gray-600 mb-6">Sign up and bring your imagination to life.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="First Name"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
              </div>
              <div>
                <input
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="flex gap-2">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-2 py-2 w-24 text-sm"
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+61">🇦🇺 +61</option>
                <option value="+1">🇨🇦 +1</option>
              </select>
              <input
                name="phoneNo"
                type="tel"
                value={formData.phoneNo}
                onChange={handleChange}
                placeholder="Phone (optional)"
                className="border border-gray-300 rounded-md px-4 py-2 flex-1"
              />
            </div>
            {errors.phoneNo && <p className="text-sm text-red-500">{errors.phoneNo}</p>}

            <div>
              <input
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="User name (optional)"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>

            <div>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <div>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm Password"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
              />
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>

            {message && <p className="text-red-500 text-sm text-center">{message}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-md transition duration-300"
            >
              {submitting ? "Sending OTP..." : "Sign Up & Receive OTP ✨"}
            </button>
          </form>

          <div className="text-sm text-gray-500 text-center mt-4">
            Already have an account? <Link to="/login" className="text-purple-600 hover:underline">Login</Link>
          </div>
        </div>
      </div>

      {showOtpModal && (
        <OtpModal
          signupData={formData}
          onClose={() => setShowOtpModal(false)}
          onVerified={() => {
            setShowOtpModal(false);
            navigate('/login');
          }}
        />
      )}
    </div>
  );
}