import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showMessage } from './utils/toast';

export default function App() {
  return (
    <div className="p-6 text-center space-y-4">
      <h1 className="text-3xl font-bold text-green-600">Global Toast Test</h1>

      <button
        onClick={() => showMessage('success', 'User profile updated!')}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Show Success
      </button>

      <button
        onClick={() => showMessage('error', '')}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Show Default Error
      </button>

      <ToastContainer />
    </div>
  );
}
