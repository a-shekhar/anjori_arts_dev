import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <p className="text-lg md:text-xl text-gray-600 mb-8">
        We are working on it. Please check back soon!
      </p>
      <img
              src="/images/404.png"
              alt="Fixing something"
              className="w-full max-w-md rounded-lg shadow-lg"
      />
    </div>
  );
};

export default NotFound;
