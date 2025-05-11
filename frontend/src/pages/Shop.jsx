// pages/ShopPage.jsx
import React, { useState } from "react";
import ArtworkCard from "../components/ArtworkCard";
import ArtworkModal from "../components/ArtworkModal";

// Dummy data for now
const generateDummyArtworks = () => {
  return Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `Artwork ${i + 1}`,
    size: "16 × 24",
    medium: "Acrylic",
    surface: "Canvas",
    price: 2000 + i * 50,
    imageUrl: "https://placekitten.com/400/400", // Replace with real images later
    tags: ["spiritual", "canvas", "limited"],
  }));
};

const ShopPage = () => {
  const artworksPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const allArtworks = generateDummyArtworks();

  const indexOfLast = currentPage * artworksPerPage;
  const indexOfFirst = indexOfLast - artworksPerPage;
  const currentArtworks = allArtworks.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(allArtworks.length / artworksPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="min-h-screen px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Our Artworks</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentArtworks.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            onClick={() => setSelectedArtwork(artwork)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-10">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
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
          disabled={currentPage === totalPages}
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

       {/* Custom Order CTA Section */}
       <div className="mt-16 mb-10 p-6 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-2xl shadow-md text-center">
         <h2 className="text-2xl font-bold text-gray-800 mb-2">
           🎨 Have something in mind?
         </h2>
         <p className="text-sm text-gray-600 mb-4">
           Let us create something special just for you.
         </p>
         <button
           onClick={() => {
             // You can navigate or open a modal later
             alert("Redirect to Custom Order page!");
           }}
           className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md animate-pulse"
         >
           ✨ Custom Order
         </button>
       </div>


    </div>
  );
};

export default ShopPage;
