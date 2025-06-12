import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import "../styles/cropper.css";
import { Button } from "../components/ui/button";
import { toast } from "react-toastify";

export default function CropModal({ imageSrc, onCancel, onCropComplete }) {
  const cropperRef = useRef(null);
  const [zoom, setZoom] = useState(1);

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      try {
        cropper.getCroppedCanvas().toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "cropped-image.png", { type: "image/png" });
            onCropComplete(file);
          } else {
            toast.error("❌ Unable to generate cropped image.");
          }
        }, "image/png");
      } catch (err) {
        console.error("Cropping failed:", err);
        toast.error("❌ Failed to crop image.");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg shadow-lg p-4 w-[90vw] max-w-xl">
        <h2 className="text-lg font-semibold mb-2">✂️ Crop Image</h2>

        <div className="w-full aspect-square bg-gray-100">
         <Cropper
           src={imageSrc}
           style={{ height: "100%", width: "100%" }}
           aspectRatio={NaN} // ❌ Remove aspect lock (square, etc.)
           viewMode={0}      // ✅ Allow full freedom of movement
           dragMode="move"
           cropBoxResizable={true}
           cropBoxMovable={true}
           center={false}       // ✅ Prevent symmetrical shrinking
           responsive={false}   // ✅ Prevent layout re-centering
           background={false}
           autoCropArea={0.8}   // Start with 80% area cropped
           ref={cropperRef}
         />

        </div>

        <div className="flex justify-end mt-4 gap-3">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button className="bg-teal-600 text-white" onClick={handleCrop}>
            Crop & Add
          </Button>
        </div>
      </div>
    </div>
  );
}
