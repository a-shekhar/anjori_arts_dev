import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);         // ✅ for full-page loader
  const [uploadProgress, setUploadProgress] = useState(0);   // ✅ for progress bar

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => {
    setIsLoading(false);
    setUploadProgress(0); // 🧹 also reset upload progress when hiding loader
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        showLoader,
        hideLoader,
        uploadProgress,       // ✅ expose to ProgressBar
        setUploadProgress     // ✅ expose to upload components
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
