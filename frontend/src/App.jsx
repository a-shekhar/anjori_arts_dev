import Navbar from './components/Navbar';

export default function App() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Test block to confirm Tailwind is working */}
      <div className="pt-24 p-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to Anjori Arts</h1>
        <p className="mt-4 text-green-600">Tailwind CSS appears to be working if this text is green.</p>

        <div className="mt-6 bg-blue-100 text-blue-800 p-4 rounded-lg shadow">
          This is a Tailwind-styled card.
        </div>
      </div>
    </>
  );
}
