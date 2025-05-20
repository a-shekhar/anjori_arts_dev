import React, { useEffect, useState } from "react";
import { useLoading } from "../context/LoadingContext";
import Lottie from "lottie-react";

const ProgressBar = () => {
  const { uploadProgress } = useLoading();
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/assets/progress-bar.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch((err) => console.error("Failed to load progress animation:", err));
  }, []);

  // 👇 Show only while uploading
  if (uploadProgress <= 0 || uploadProgress >= 100 || !animationData) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-[10000] pointer-events-none flex items-center justify-center">
      <div className="w-40 h-6">
        <Lottie animationData={animationData} loop autoplay />
      </div>
    </div>
  );
};

export default ProgressBar;
