import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../utils/api';
import { useAuth } from '../components/AuthContext';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
        credentials: 'include',
      });

      const result = await response.json();

      // ❌ If login failed — show friendly message & exit
      if (!response.ok || !result.success) {
        setMessage(
          result.message === 'Bad credentials'
            ? 'Oops! Incorrect email or password.'
            : result.message || 'Login failed. Please try again.'
        );
        setMessageType('error');
        return;
      }

      // ✅ Login successful
      setMessage(result.message || 'Login successful ✨');
      setMessageType('success');

      const profileRes = await fetch(`${API_BASE_URL}/api/user/profile`, {
        credentials: 'include',
      });

      if (profileRes.ok) {
        const userData = await profileRes.json();
        setUser(userData.data);

      }

      navigate('/', { replace: true }); // Redirect only on success
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Internal Server Issue');
      setMessageType('error');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Art Image */}
        <div className="hidden md:block">
          <img
            src="/images/Login.png"
            alt="art-login"
            className="w-full max-w-sm mx-auto"
          />
        </div>

        {/* Right Form */}
        <div className="bg-[#fdfdfd] rounded-2xl shadow-md p-8 w-full">
          <h2 className="text-3xl font-semibold text-center text-rose-600 mb-2">
            Welcome back to Anjori Arts 🎨
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Enter the studio and keep creating your magic.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-rose-300 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-rose-300 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            {message && (
              <p
                className={`text-sm text-center px-2 py-1 rounded-md ${
                  messageType === 'success' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                }`}
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 rounded-md transition duration-300"
            >
              Enter the Studio ✨
            </button>
          </form>

          <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
            <Link to="/forgot-password" className="hover:underline">
              Forgot Password?
            </Link>
            <Link to="/signup" className="hover:underline">
              New here? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
