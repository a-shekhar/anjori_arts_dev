import React, { useState } from "react";
import { toast } from "react-toastify";

export default function AddArtwork() {
  const [formData, setFormData] = useState({
    title: "",
    size: "",
    price: "",
    paintType: "",
    surface: "",
    available: true,
    featured: false,
    images: [], // { file, preview }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const filesWithPreview = files.map((file) => {
      const preview = URL.createObjectURL(file);
      return { file, preview };
    });

    setFormData((prev) => ({
      ...prev,
      images: [...filesWithPreview],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, size, price, paintType, surface, images } = formData;

    if (!title || !size || !price || !paintType || !surface || images.length === 0) {
      toast.error("Please fill in all fields and upload at least one image.");
      return;
    }

    toast.success("Artwork added (pending backend upload)");
    console.log("Form submitted:", formData);

    setFormData({
      title: "",
      size: "",
      price: "",
      paintType: "",
      surface: "",
      available: true,
      featured: false,
      images: [],
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded p-6 space-y-6">
      <h2 className="text-2xl font-bold">Add New Artwork</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        {[
          { name: "title", label: "Title", type: "text", placeholder: "Enter title" },
          { name: "size", label: "Size", type: "text", placeholder: "e.g. 24x36" },
          { name: "price", label: "Price (₹)", type: "number", placeholder: "Enter price" },
          { name: "paintType", label: "Paint Type", type: "text", placeholder: "e.g. Oil, Acrylic" },
          { name: "surface", label: "Surface", type: "text", placeholder: "e.g. Canvas, Wood" },
        ].map(({ name, label, type, placeholder }) => (
          <div key={name} className="flex items-center justify-between gap-4">
            <label className="w-32 font-medium">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className="flex-1 border rounded p-1.5"
            />
          </div>
        ))}

        {/* File Upload */}
        <div>
          <label className="block font-medium mb-1">Upload Images</label>
          <div className="border rounded p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-50">
            <span className="text-gray-600 text-sm">You can upload multiple images.</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="file:mr-4 file:py-1.5 file:px-4 file:rounded file:border-0 file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 text-sm"
            />
          </div>

          {/* Preview */}
          {formData.images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {formData.images.map(({ file, preview }, index) => (
                <div key={index} className="flex flex-col items-center text-center text-xs">
                  <img
                    src={preview}
                    alt={`preview-${index}`}
                    className="h-20 w-20 object-cover rounded shadow"
                  />
                  <span className="mt-1 truncate w-20">{file.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkboxes */}
        <div className="flex gap-6 flex-wrap">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />
            <span>Available</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />
            <span>Featured Artwork</span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 w-full sm:w-auto"
        >
          Add Painting
        </button>
      </form>
    </div>
  );
}
