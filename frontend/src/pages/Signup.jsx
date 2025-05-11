import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.text();
      if (response.ok) {
        // Redirect to OTP verification page if needed
        setMessage('OTP sent! Check your email');
      } else {
        setMessage(result || 'Signup failed. Try again.');
      }
    } catch {
      setMessage('Internal Server Issue');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Illustration */}
        <div className="hidden md:block">
          <img
            src="/images/Signup.png"
            alt="signup-art"
            className="w-full max-w-sm mx-auto"
          />
        </div>

        {/* Signup Form */}
        <div className="bg-[#fdfdfd] rounded-2xl shadow-md p-8 w-full">
          <h2 className="text-3xl font-semibold text-center text-pink-600 mb-2">
            Join Anjori Arts 💖
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Sign up and bring your imagination to life.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="First Name"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
              />
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Last Name"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone (optional)"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm Password"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />

            {message && <p className="text-red-500 text-sm text-center">{message}</p>}

            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md transition duration-300"
            >
              Sign Up & Receive OTP ✨
            </button>
          </form>

          <div className="text-sm text-gray-500 text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
