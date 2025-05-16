import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../components/AuthContext';
import PaintbrushLoader from '../components/PaintbrushLoader';
import { useNavigate } from "react-router-dom";


export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, setUser, loading: authLoading  } = useAuth(); // ✅ added user check
  const navigate = useNavigate()


  // ✅ Redirect if already logged in
        useEffect(() => {
          if (user) {
            navigate('/profile', { replace: true });
          }
        }, [user, navigate]);

     if (authLoading) return <PaintbrushLoader />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error('Please enter your email.');

    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        toast.success(result.message || 'Reset instructions sent to your email.');
        // ✅ navigate to reset-password page and pass email (optional)
          navigate('/reset-password', {
            state: { email }  // 👈 optional — you can auto-fill this later
          });
      } else {
        toast.error(result.message || 'Failed to send reset instructions.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Internal Server Error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-gray-50 p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-rose-600 mb-2">
          Forgot your password?
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email and we’ll send you a reset link or OTP.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-rose-300 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-md transition"
          >
            {loading ? 'Sending...' : 'Send Email OTP'}
          </button>
        </form>
      </div>
    </div>
  );
}
