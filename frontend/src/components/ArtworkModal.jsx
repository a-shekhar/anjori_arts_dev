
import React, { useEffect } from "react";

const ArtworkModal = ({ artwork, onClose }) => {
  if (!artwork) return null;

  // 🔒 Lock scroll when modal opens
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const {
    title,
    size,
    medium,
    surface,
    price,
    tags,
    imageUrl,
    description,
    availability,
    createdOn,
    artistNote,
  } = artwork;

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
          <img src={imageUrl} alt={title} className="max-h-[400px] object-contain" />
        </div>

        {/* Details */}
        <h2 className="text-xl font-semibold mb-1">{title}</h2>
        <p className="text-sm text-gray-600 mb-1">{size} • {medium} on {surface}</p>
        <p className="text-blue-700 font-bold text-base mb-2">₹{price}</p>

        {/* Optional Fields */}
        {description && <p className="text-sm text-gray-700 mb-2">{description}</p>}
        {createdOn && <p className="text-xs text-gray-500 mb-1">🗓️ Created On: {createdOn}</p>}
        {availability && (
          <p className={`text-xs mb-2 font-medium ${
            availability === "Available" ? "text-green-600" : "text-red-600"
          }`}>
            {availability}
          </p>
        )}
        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        {artistNote && (
          <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-300 text-yellow-800 text-sm rounded">
            🖌️ Artist Note: {artistNote}
          </div>
        )}

        {/* Request Now Button */}
        <button
          onClick={() => {
            // Request action here
          }}
          className="mt-5 w-full bg-violet-500 text-white text-sm py-2 rounded hover:bg-violet-600 transition"
        >
          🎨 Request Now
        </button>
      </div>
    </div>
  );
};

export default ArtworkModal;
