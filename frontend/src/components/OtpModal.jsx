import React, { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '../utils/api';

export default function OtpModal({ signupData, onClose, onVerified }) {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const timerStarted = useRef(false);
  const inputRef = useRef(null);

  // Auto focus on OTP input when modal opens
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // Start resend timer
  useEffect(() => {
    if (!timerStarted.current) {
      timerStarted.current = true;
      setTimer(60);
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (s) => `00:${s.toString().padStart(2, '0')}`;

  const handleVerify = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const fullPayload = {
        ...signupData,
        otp: otp,
      };

      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullPayload),
      });

      const defaultMessage = "Something went wrong. Please try again later.";
      const result = await response.json();

      const msg = typeof result.message === 'string' ? result.message : defaultMessage;
      setMessage(msg);

      if (response.ok && result.success) {
        setTimeout(() => {
          setLoading(false);
          onVerified();
        }, 2000);
      } else {
        setMessage(msg || 'Invalid OTP');
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setMessage('Internal Server Error');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const response = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signupData.email, firstName: signupData.firstName }),
      });

      const result = await response.json();
      const msg = result.message || 'Something went wrong';

      if (response.ok && result.success) {
        setMessage('OTP resent!');
        setTimer(60);
      } else {
        setMessage(msg);
      }
    } catch (err) {
      console.error('Resend error:', err);
      setMessage('Could not resend OTP');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg px-6 py-8 w-full max-w-sm">
        <h2 className="text-xl font-semibold text-center text-purple-600 mb-2">Verify Your Email</h2>
        <p className="text-sm text-center text-gray-600 mb-5">
          We’ve sent an OTP to <strong>{signupData.email}</strong>
        </p>

        <input
          ref={inputRef}
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          placeholder="Enter 6-digit OTP"
          maxLength={6}
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-3 text-center tracking-widest"
        />

        {typeof message === 'string' && (
          <p
            className={`text-sm text-center mb-3 ${
              message.toLowerCase().includes('sent') || message.toLowerCase().includes('redirecting')
                ? 'text-green-600'
                : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-md mb-4 transition duration-300"
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>

        {timer > 0 ? (
          <p className="text-sm text-center text-gray-400 mb-2">
            Resend available in <span className="font-mono">{formatTime(timer)}</span>
          </p>
        ) : (
          <button
            onClick={handleResend}
            className="text-sm text-purple-600 hover:underline block text-center mb-2"
          >
            Resend OTP
          </button>
        )}

        <button
          onClick={onClose}
          className="text-sm text-gray-400 hover:text-gray-600 block mx-auto mt-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
