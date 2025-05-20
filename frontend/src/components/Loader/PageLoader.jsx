import React, { useEffect, useState } from "react";
import { useLoading } from "../context/LoadingContext";
import Lottie from "lottie-react";

const PageLoader = () => {
  const { isLoading } = useLoading();
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/assets/paintbrush-loading.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch((err) => {
        console.error("Failed to load PageLoader animation:", err);
      });
  }, []);

  if (!isLoading || !animationData) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-orange-50 via-pink-50 to-purple-100 bg-opacity-95 flex flex-col items-center justify-center">
      <div className="w-48 h-48 mb-4">
        <Lottie animationData={animationData} loop autoplay />
      </div>
      <p className="text-pink-700 text-lg font-semibold font-quicksand animate-pulse">
        Bringing your art to life...
      </p>
    </div>
  );
};

export default PageLoader;
