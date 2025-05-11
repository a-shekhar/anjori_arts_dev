import React, { useState, useEffect } from "react";
import { X, Download } from "lucide-react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ImageZoomModal = ({
  src,
  alt = "Zoomable Image",
  className = "h-12 w-12 rounded cursor-pointer",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  return (
    <>
      {/* Thumbnail image */}
      <img
        src={src}
        alt={alt}
        className={className}
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
          {/* Controls */}
          <div className="absolute top-4 right-4 flex gap-4">
            <a
              href={src}
              download
              className="text-white hover:text-gray-300"
              title="Download"
            >
              <Download />
            </a>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300"
              title="Close"
            >
              <X />
            </button>
          </div>

          {/* Zoomable image */}
          <Zoom
            overlayBgColorStart="rgba(0, 0, 0, 0.7)"
            overlayBgColorEnd="rgba(0, 0, 0, 0.85)"
          >
            <img
              src={src}
              alt={alt}
              className="max-w-[90vw] max-h-[80vh] w-auto h-auto rounded-lg shadow-lg transition-transform duration-300"
              onClick={(e) => e.stopPropagation()}
            />
          </Zoom>
        </div>
      )}
    </>
  );
};

export default ImageZoomModal;
