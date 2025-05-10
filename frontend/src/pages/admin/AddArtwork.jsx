import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../utils/api";

export default function AddArtwork() {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    size: "",
    price: "",
    medium: "",
    surface: "",
    tags: "",
    available: true,
    featured: false,
    images: [], // { file, preview }
  });

  const [loading, setLoading] = useState(false);

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

    const filesWithPreview = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...filesWithPreview], // ✅ Append
    }));
  };

  const removeImage = (indexToRemove) => {
    setFormData((prev) => {
      URL.revokeObjectURL(prev.images[indexToRemove].preview); // ✅ Free memory
      return {
        ...prev,
        images: prev.images.filter((_, i) => i !== indexToRemove),
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("title", formData.title);
    form.append("size", formData.size);
    form.append("price", formData.price);
    form.append("medium", formData.medium);
    form.append("surface", formData.surface);
    form.append("tags", formData.tags)
    form.append("available", formData.available);
    form.append("featured", formData.featured);

    formData.images.forEach(({ file }) => {
      form.append("images", file);
    });

    try {
      const response = await fetch(`${API_BASE_URL}/api/artworks/add`, {
        method: "POST",
        body: form,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Artwork added successfully!");
        // Clear previews from memory
        formData.images.forEach(({ preview }) => URL.revokeObjectURL(preview));
        // Reset form
        setFormData({
          title: "",
          size: "",
          price: "",
          medium: "",
          surface: "",
          tags: "",
          available: true,
          featured: false,
          images: [],
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        toast.error(result.message || "Failed to add artwork.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded p-6 space-y-6">
      <h2 className="text-2xl font-bold">Add New Artwork</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        {[
          { name: "title", label: "Title", type: "text", placeholder: "Enter title" },
          { name: "size", label: "Size", type: "text", placeholder: "e.g. 24x36" },
          { name: "price", label: "Price (₹)", type: "number", placeholder: "Enter price" },
          { name: "medium", label: "Medium", type: "text", placeholder: "e.g. Oil, Acrylic" },
          { name: "surface", label: "Surface", type: "text", placeholder: "e.g. Canvas, Wood" },
          { name: "tags", label: "Tags", type: "text", placeholder: "e.g. Nature, Mythological (Optional, Seperated By comma)" },

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
              ref={fileInputRef}
              className="file:mr-4 file:py-1.5 file:px-4 file:rounded file:border-0 file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 text-sm"
            />
          </div>

          {/* Preview with Remove Button */}
          {formData.images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {formData.images.map(({ file, preview }, index) => (
                <div key={index} className="relative flex flex-col items-center text-center text-xs">
                  <img
                    src={preview}
                    alt={`preview-${index}`}
                    className="h-20 w-20 object-cover rounded shadow"
                  />
                  <span className="mt-1 truncate w-20">{file.name}</span>

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-white border border-gray-300 rounded-full w-5 h-5 flex items-center justify-center text-xs text-red-600 hover:bg-red-100"
                    title="Remove"
                  >
                    ×
                  </button>
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

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-60"
          disabled={loading}
        >
          {loading && (
            <svg
              className="w-4 h-4 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          )}
          {loading ? "Adding..." : "Add Artwork"}
        </button>
      </form>
    </div>
  );
}
