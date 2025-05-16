import React from 'react';

export default function PaintbrushLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center animate-pulse">
        <img
          src="/images/paintbrush.png"
          alt="Loading..."
          className="w-16 h-16"
        />
        <p className="mt-2 text-pink-600 font-medium text-sm">
          Loading your creative space...
        </p>
      </div>
    </div>
  );
}
