import React from 'react';

export default function ImageThumbnailList({ images = [] }) {
  if (images.length === 0) return <span className="text-sm text-gray-400">No images</span>;

  return (
    <div className="flex flex-wrap gap-2">
      {images.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Order image ${index + 1}`}
          className="w-16 h-16 object-cover rounded border"
        />
      ))}
    </div>
  );
}
