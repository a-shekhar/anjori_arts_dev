import React, { useEffect, useState } from "react";
import { useLoading } from "../context/LoadingContext";
import Lottie from "lottie-react";

const ProgressBar = () => {
  const { uploadProgress, setUploadProgress } = useLoading();
  const [animationData, setAnimationData] = useState(null);

  // Load the Lottie JSON
  useEffect(() => {
    fetch("/assets/progress-bar.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch((err) => console.error("Failed to load progress animation:", err));
  }, []);

  // Auto-reset after reaching 100%
  useEffect(() => {
    if (uploadProgress >= 100) {
      const timeout = setTimeout(() => {
        setUploadProgress(0);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [uploadProgress]);

  // ✅ EARLY RETURN: Prevent empty white box
  if (
    uploadProgress <= 0 ||
    uploadProgress >= 100 ||
    !animationData
  ) return null;

  // ✅ Final visible progress bar
  return (
    <div className="fixed top-[80px] left-1/2 transform -translate-x-1/2 z-[9999] bg-white/70 backdrop-blur-md border border-gray-300 rounded-lg shadow-lg px-4 py-2 w-[25%] flex items-center justify-center pointer-events-none">
      <div className="w-full h-6">
        <Lottie animationData={animationData} loop autoplay />
      </div>
    </div>
  );
};

export default ProgressBar;
