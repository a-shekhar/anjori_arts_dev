// pages/ShopPage.jsx
import React, { useState, useEffect } from "react";
import ArtworkCard from "../components/ArtworkCard";
import ArtworkModal from "../components/ArtworkModal";
import { API_BASE_URL } from "../utils/api";

const ShopPage = () => {
  const artworksPerPage = 20;
  const [artworks, setArtworks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // backend uses 0-based index
  const [loading, setLoading] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/artworks?page=${currentPage}&size=${artworksPerPage}`, {
          headers: {
            "Accept": "application/json"
          }
        });

        const data = await res.json();
        setArtworks(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Our Artworks</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading artworks...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {artworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                onClick={() => setSelectedArtwork(artwork)}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-10 flex-wrap">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
              disabled={currentPage === 0}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i)}
                className={`px-3 py-1 rounded ${
                  currentPage === i
                    ? "bg-violet-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </div>

          {/* Modal */}
          {selectedArtwork && (
            <ArtworkModal
              artwork={selectedArtwork}
              onClose={() => setSelectedArtwork(null)}
            />
          )}

          {/* Custom Order CTA */}
          <div className="mt-16 mb-10 p-6 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-2xl shadow-md text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              🎨 Have something in mind?
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Let us create something special just for you.
            </p>
            <button
              onClick={() => {
                // Redirect to custom order page
                alert("Redirect to Custom Order page!");
              }}
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md animate-pulse"
            >
              ✨ Custom Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShopPage;
