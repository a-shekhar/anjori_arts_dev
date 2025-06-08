import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLoading } from "../../components/context/LoadingContext";

import SurfaceDropdown from "../../components/dropdowns/SurfaceDropdown";
import AvailabilityDropdown from "../../components/dropdowns/AvailabilityDropdown";
import MediumDropdown from "../../components/dropdowns/MediumDropdown";

export default function AddArtwork() {
  const fileInputRef = useRef(null);
  const { setUploadProgress } = useLoading();

  const [formData, setFormData] = useState({
    title: "",
    size: "",
    price: "",
    medium: [],
    surface: "",
    tags: "",
    featured: false,
    images: [],
    description: "",
    availability: "AV",
    artistNote: "",
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

    const withPreview = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...withPreview],
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => {
      URL.revokeObjectURL(prev.images[index].preview);
      return {
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    form.append("title", formData.title);
    form.append("size", formData.size);
    form.append("price", formData.price);
    formData.medium.forEach((m) => form.append("medium", m));
    form.append("surface", formData.surface);
    form.append("tags", formData.tags);
    form.append("featured", formData.featured);
    form.append("description", formData.description);
    form.append("availability", formData.availability);
    form.append("artistNote", formData.artistNote);
    formData.images.forEach(({ file }) => form.append("images", file));

    try {
      const res = await axios.post("/api/admin/artworks/add", form, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setUploadProgress(percent);
        },
      });

      if (res.status === 200) {
        toast.success(res.data.message || "Artwork added successfully!");
        formData.images.forEach(({ preview }) => URL.revokeObjectURL(preview));
        setFormData({
          title: "",
          size: "",
          price: "",
          medium: [],
          surface: "",
          tags: "",
          featured: false,
          images: [],
          description: "",
          availability: "AVAIL",
          artistNote: "",
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        toast.error(res.data.message || "Failed to add artwork.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Internal Server Error");
    } finally {
      setUploadProgress(0);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded p-6 space-y-6">
      <h2 className="text-2xl font-bold">Add New Artwork</h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        {["title", "size", "price", "tags"].map((name) => {
          const label = name.charAt(0).toUpperCase() + name.slice(1);
          return (
            <div key={name} className="flex items-center justify-between gap-4">
              <label className="w-32 font-medium">{label}</label>
              <input
                type={name === "price" ? "number" : "text"}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={`Enter ${label}`}
                className="flex-1 border rounded p-1.5"
              />
            </div>
          );
        })}

        <div className="flex items-center justify-between gap-4">
          <label className="w-32 font-medium">Surface</label>
          <div className="flex-1">
            <SurfaceDropdown
              value={formData.surface}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, surface: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <label className="w-32 font-medium">Medium</label>
          <div className="flex-1">
            <MediumDropdown
              value={formData.medium}
              onChange={(selected) =>
                setFormData((prev) => ({ ...prev, medium: selected }))
              }
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <label className="w-32 font-medium">Availability</label>
          <div className="flex-1">
            <AvailabilityDropdown
              value={formData.availability}
              onChange={handleChange}
            />
          </div>
        </div>

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

          {formData.images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {formData.images.map(({ file, preview }, index) => (
                <div key={index} className="relative text-xs text-center">
                  <img
                    src={preview}
                    alt={`preview-${index}`}
                    className="h-20 w-20 object-cover rounded shadow"
                  />
                  <span className="mt-1 truncate block">{file.name}</span>
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

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          Featured Artwork
        </label>

        <div className="flex flex-col">
          <label htmlFor="description" className="font-medium mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            placeholder="Short description about the artwork"
            className="w-full border rounded px-3 py-2 text-sm"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="artistNote" className="font-medium mb-1">Artist Note</label>
          <textarea
            id="artistNote"
            name="artistNote"
            rows="3"
            placeholder="Add a personal note about the piece"
            className="w-full border rounded px-3 py-2 text-sm"
            value={formData.artistNote}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 w-full sm:w-auto transition"
        >
          Add Artwork
        </button>
      </form>
    </div>
  );
}
