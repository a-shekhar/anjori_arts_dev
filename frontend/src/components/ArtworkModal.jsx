// components/ArtworkModal.jsx
import React from "react";

const ArtworkModal = ({ artwork, onClose }) => {
  if (!artwork) return null;

  const { title, size, medium, surface, price, tags, imageUrl } = artwork;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center px-4">
      <div className="bg-white max-w-2xl w-full rounded-xl overflow-y-auto max-h-[90vh] shadow-lg relative p-4">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Image */}
        <div className="flex justify-center items-center bg-gray-100 rounded-lg p-4 mb-4">
          <img
            src={imageUrl}
            alt={title}
            className="max-h-[400px] object-contain"
          />
        </div>

        {/* Details */}
        <h2 className="text-xl font-semibold mb-1">{title}</h2>
        <p className="text-sm text-gray-600 mb-1">
          {size} • {medium} on {surface}
        </p>
        <p className="text-blue-700 font-bold text-base mb-2">₹{price}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Request Now Button */}
        <button
          onClick={() => {
            // Add request action here
          }}
          className="w-full bg-violet-500 text-white text-sm py-2 rounded hover:bg-violet-600 transition"
        >
          🎨 Request Now
        </button>
      </div>
    </div>
  );
};

export default ArtworkModal;
