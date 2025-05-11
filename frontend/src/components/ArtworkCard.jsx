// components/ArtworkCard.jsx
import React from "react";

const ArtworkCard = ({ artwork, onClick }) => {
  const { title, size, medium, surface, price, tags, imageUrl } = artwork;

  return (
    <div
      className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
      onClick={onClick}
    >
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-t-xl">
        <img
          src={imageUrl}
          alt={title}
          className="h-full object-contain p-2"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{size} • {medium} on {surface}</p>
        <p className="text-blue-700 font-bold text-base">₹{price}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-1">
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
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click
            // You can handle request logic here later
          }}
          className="mt-3 w-full bg-violet-500 text-white text-sm py-2 rounded hover:bg-violet-600 transition"
        >
          🎨 Request Now
        </button>
      </div>
    </div>
  );
};

export default ArtworkCard;
