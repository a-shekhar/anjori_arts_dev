import React, { useEffect, useState } from "react";
import ParticlesBackground from "../components/ParticlesBackground";
import axios from "axios";
import { showMessage } from '../utils/toast';
import HeroLoader from "../components/HeroLoader";
import { API_BASE_URL } from "../utils/api";

const Homepage = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true); // 👈 Add loader state
  const [error, setError] = useState("");

  useEffect(() => {
    // Show the HeroLoader for 3 seconds
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/home/featured-artworks`);
        const artworkArray = response.data?.data ?? response.data;

        if (!Array.isArray(artworkArray)) {
          throw new Error("Invalid data format");
        }

        setArtworks(artworkArray.slice(0, 12));
      } catch (err) {
        setError("Unable to load artworks.");
        console.error("❌ Error:", err);
        showMessage("error", "Unable to load artworks.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  if (showLoader) {
    return <HeroLoader />; // ⏳ Show animated loader on first load
  }

  return (
    <div className="fade-in">
      {/* Main Content */}
      <div className="flex flex-col gap-8 p-4 md:p-8">
        {/* Hero Section */}
        <section className="relative w-full h-[350px] md:h-[450px] bg-black rounded-2xl overflow-hidden text-white mb-8">
          <ParticlesBackground />

          <div className="absolute inset-0 flex items-center justify-center text-center z-10 px-4">
            <div className="space-y-4 md:space-y-5 max-w-xl">
              <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                Welcome to Anjori Arts
              </h1>

              <p className="font-quicksand italic text-sm sm:text-base md:text-lg text-gray-300">
                “Art enables us to find ourselves and lose ourselves at the same time.” — Thomas Merton
              </p>

              <p className="font-['quicksand'] text-sm sm:text-base md:text-lg text-gray-200">
                Bring Your Imagination to Canvas
              </p>

              <a
                href="/custom-order"
                className="inline-block mt-2 sm:mt-4 px-6 py-2 bg-pink-500 text-white rounded-full shadow-md hover:bg-pink-600 transition-all text-sm sm:text-base"
              >
                Custom Order 🎨
              </a>
            </div>
          </div>

        </section>

        {/* Artworks Grid */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Featured Paintings</h2>

          {loading ? (
            <p className="text-center">Loading artworks...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {artworks.map((art) => (
                <div key={art.id} className="bg-white rounded-xl shadow p-4">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-72 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-semibold">{art.title}</h3>
                  <p className="text-sm text-gray-500">
                    {art.size} • {art.paintType} on {art.surface}
                  </p>
                  <p className="text-blue-600 font-semibold mt-1">{art.price}</p>
                  <button className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md transition">
                    Request Now
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <a href="/shop" className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-medium px-6 py-3 rounded-full transition shadow">
              Show More →
            </a>
          </div>
        </section>

        {/* Custom Order CTA */}
        <section className="mt-8 rounded-2xl p-6 md:p-8 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white text-center shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Have something in mind?</h2>
          <a href="/custom-order" className="bg-yellow-300 text-black px-6 py-3 rounded-full text-lg font-semibold inline-flex items-center gap-2 hover:bg-yellow-400 transition">
            ✏️ Custom Order
          </a>
        </section>
      </div>
    </div>
  );
};

export default Homepage;
