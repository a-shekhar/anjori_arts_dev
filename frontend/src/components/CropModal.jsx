import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button } from "../components/ui/button";
import getCroppedImg from "../utils/cropImage";
import { toast } from "react-toastify";

export default function CropModal({ imageSrc, onCancel, onCropComplete }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropAreaComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleDone = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropComplete(croppedImage);
    } catch (e) {
      console.error("Cropping failed:", e);
      toast.error("❌ Failed to crop image.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg shadow-lg p-4 w-[90vw] max-w-xl">
        <h2 className="text-lg font-semibold mb-2">✂️ Crop Image</h2>
        <div className="relative w-full aspect-square bg-gray-200">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="rect"
            showGrid={true}
            draggable={true}
            restrictPosition={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropAreaComplete}
            zoomWithScroll={true}
            minZoom={1}
            maxZoom={3}
            style={{
              cropAreaStyle: {
                border: "2px dashed #4b5563",
                borderRadius: "8px",
              },
            }}
          />
        </div>
        <div className="flex justify-end mt-4 gap-3">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button className="bg-teal-600 text-white" onClick={handleDone}>Crop & Add</Button>
        </div>
      </div>
    </div>
  );
}