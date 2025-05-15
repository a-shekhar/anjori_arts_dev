import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './components/AuthContext'; // ✅ correct import

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>       {/* ✅ Wrap your app here */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
