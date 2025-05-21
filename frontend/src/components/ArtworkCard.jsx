import React from "react";
import { useNavigate } from "react-router-dom";
import { BsStack } from "react-icons/bs";

const ArtworkCard = ({ artwork, onClick }) => {
  const mainImage = artwork.images?.find(img => img.main) || artwork.images?.[0];
  const hasMultipleImages = artwork.images?.length > 1;
  const navigate = useNavigate();

  const handleRequestNow = () => {
    navigate("/order-summary",  { state: { artwork } });
  };

  return (
    <div
      className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer flex flex-col"
      onClick={onClick}
    >
      <div className="relative">
        {mainImage?.imageUrl ? (
          <img
            src={mainImage.imageUrl}
            alt={mainImage.altText || artwork.title}
            className="w-full h-auto max-h-64 object-contain rounded-t-xl bg-white"
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-t-xl text-gray-400 italic text-sm">
            No Image Available
          </div>
        )}

        {hasMultipleImages && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white rounded-full p-1">
            <BsStack size={16} />
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-1">{artwork.title}</h3>
        <p className="text-sm text-gray-600 mb-1">
          {artwork.size} • {artwork.medium} on {artwork.surface}
        </p>
        <p className="text-blue-700 font-bold text-base mb-2">₹{artwork.price}</p>

        <div className="w-full text-left mb-2">
          <button
            onClick={onClick}
            className="text-sm text-blue-600 underline hover:text-blue-800"
          >
            Show More
          </button>
        </div>

        <button
          onClick={handleRequestNow}
          className="mt-auto bg-purple-500 text-white text-sm py-2 rounded hover:bg-purple-600 transition flex items-center justify-center gap-2"
        >
          🎨 Request Now
        </button>
      </div>
    </div>
  );
};

export default ArtworkCard;
