import React, { useEffect } from "react";
import { useLoading } from "../context/LoadingContext";

const ProgressBar = () => {
  const { uploadProgress, setUploadProgress } = useLoading();

  useEffect(() => {
    if (uploadProgress >= 100) {
      const timeout = setTimeout(() => {
        setUploadProgress(0);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [uploadProgress]);

  if (uploadProgress <= 0 || uploadProgress >= 100) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] w-[40vw] max-w-md h-4 bg-gray-200 rounded-full shadow-md overflow-hidden pointer-events-none">
      <div
        className="h-full rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 animate-progress"
        style={{ width: `${uploadProgress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
