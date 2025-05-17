import axios from 'axios';

let setWakingUpExternal = null;
let isWakingUp = false;

export const registerWakingUpSetter = (setter) => {
  setWakingUpExternal = setter;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080',
  timeout: 8000,
});

api.interceptors.response.use(
  (response) => {
    if (isWakingUp && setWakingUpExternal) {
      console.log('[✅ WakeUp Recovered] Backend is back');
      isWakingUp = false;
      setWakingUpExternal(false);
    }
    return response;
  },
  (error) => {
    const noResponse = !error.response;
    const status500 = error.response?.status >= 500;

    if ((noResponse || status500) && setWakingUpExternal && !isWakingUp) {
      console.warn('[🔥 WakeUp Triggered] Backend unreachable or 500+ error');
      isWakingUp = true;
      setWakingUpExternal(true);
    }

    return Promise.reject(error);
  }
);

export default api;
