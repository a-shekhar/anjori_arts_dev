import { createContext, useContext, useEffect, useState } from 'react';
import { API_BASE_URL } from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track fetch status

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/user/profile', {
        credentials: 'include',
      });
      if (res.ok) {
        const resJson = await res.json();
        setUser(resJson.data);

      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Failed to fetch user', err);
      setUser(null);
    } finally {
      setLoading(false); // Always mark as resolved
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
