import { toast } from 'react-toastify';

export const showMessage = (type = 'success', message = '') => {
  const defaultMessage = type === 'success' ? 'Success' : 'Internal Server Issue';

  toast[type](message || defaultMessage, {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
  });
};
