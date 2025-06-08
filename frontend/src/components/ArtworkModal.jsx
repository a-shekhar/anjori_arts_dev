import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageZoomModal from "../components/ImageZoomModal";

const ArtworkModal = ({ artwork, onClose }) => {
  const [activeImage, setActiveImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (artwork?.images?.length) {
      const main = artwork.images.find((img) => parseInt(img.displayOrder) === 0);
      setActiveImage(main || artwork.images[0]);
    }
  }, [artwork]);

  if (!artwork || !activeImage) return null;

  const handleRequestNow = () => {
    navigate("/order-summary", { state: { artwork } });
  };

  const sortedMediums = Array.isArray(artwork.mediums)
    ? artwork.mediums
        .map((m) => m.name)
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b))
        .join(", ")
    : "N/A";

  const {
    title,
    size,
    surface = {},
    price,
    tags,
    description,
    availability = {},
    createdAt,
    artistNote,
    slug,
    images,
  } = artwork;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center px-4">
      <div className="bg-white max-w-2xl w-full rounded-xl overflow-y-auto max-h-[90vh] shadow-lg relative p-4">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="flex justify-center items-center bg-gray-100 rounded-lg p-4 mb-4">
          <ImageZoomModal
            src={activeImage.imageUrl}
            alt={slug}
            className="max-h-[300px] cursor-zoom-in object-contain"
          />
        </div>

        {images?.length > 1 && (
          <div className="flex gap-2 overflow-x-auto mb-4 px-1">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img.imageUrl}
                alt={slug}
                className={`w-16 h-16 object-cover rounded border-2 ${
                  img.imageUrl === activeImage.imageUrl
                    ? "border-violet-600"
                    : "border-transparent"
                } cursor-pointer`}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        )}

        <h2 className="text-xl font-semibold mb-1">{title}</h2>
        <p className="text-sm text-gray-600 mb-1">
          {size} • {sortedMediums} on {surface.name || "N/A"}
        </p>
        <p className="text-blue-700 font-bold text-base mb-2">₹{price}</p>

        {description && (
          <p className="text-sm text-gray-700 mb-2">{description}</p>
        )}
        {createdAt && (
          <p className="text-xs text-gray-500 mb-1">
            🗓️ Created At: {createdAt}
          </p>
        )}
        {availability?.name && (
          <p
            className={`text-xs mb-2 font-medium ${
              availability.name === "Available" || availability.name === "Ready for Request"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {availability.name}
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

        <button
          onClick={handleRequestNow}
          className="mt-5 w-full bg-violet-500 text-white text-sm py-2 rounded hover:bg-violet-600 transition"
        >
          🎨 Request Now
        </button>
      </div>
    </div>
  );
};

export default ArtworkModal;
