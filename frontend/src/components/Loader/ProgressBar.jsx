import React, { useEffect, useState } from "react";
import { useLoading } from "../context/LoadingContext";
import Lottie from "lottie-react";

const ProgressBar = () => {
  const { uploadProgress, setUploadProgress } = useLoading();
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/assets/progress-bar.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch((err) => console.error("Failed to load Lottie:", err));
  }, []);

  useEffect(() => {
    if (uploadProgress >= 100) {
      const timeout = setTimeout(() => {
        setUploadProgress(0);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [uploadProgress]);

  if (uploadProgress <= 0 || uploadProgress >= 100 || !animationData) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md bg-black/20 pointer-events-none">
      <div className="w-40 h-40 md:w-56 md:h-56">
        <Lottie animationData={animationData} loop autoplay className="w-full h-full" />
      </div>
      {/* Optional: Uploading text below animation */}
      <div className="absolute bottom-[30%] text-white text-sm md:text-base font-medium animate-pulse">
        Working on your request...
      </div>
    </div>
  );
};

export default ProgressBar;
