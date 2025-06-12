import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { toast } from "react-toastify";
import SurfaceDropdown from "../../components/dropdowns/SurfaceDropdown";
import AvailabilityDropdown from "../../components/dropdowns/AvailabilityDropdown";
import MediumDropdown from "../../components/dropdowns/MediumDropdown";
import ImageZoomModal from "../../components/ImageZoomModal";
import CropModal from "../../components/CropModal";
import ConfirmModal from "../../components/modals/ConfirmModal";
import ProgressBar from "../../components/Loader/ProgressBar";

export default function ArtworkDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const passedArtwork = location.state?.artwork;

  const [art, setArt] = useState(() => {
    const data = passedArtwork || {};
    return {
      ...data,
      surface: typeof data.surface === "object" ? data.surface.code : data.surface || "",
      availability: typeof data.availability === "object" ? data.availability.code : data.availability || "",
      mediums: Array.isArray(data.mediums)
        ? data.mediums.map((m) => (typeof m === "object" ? m.code : m))
        : [],
      tags: Array.isArray(data.tags)
        ? data.tags.map((t) => t.trim())
        : typeof data.tags === "string"
        ? data.tags.split(",").map((t) => t.trim())
        : [],
    };
  });

  const [newImages, setNewImages] = useState([]);
  const [zoomImage, setZoomImage] = useState(null);
  const [cropModal, setCropModal] = useState({ open: false, file: null, previewUrl: null });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    sessionStorage.setItem("last-artwork-edit", JSON.stringify(passedArtwork));
  }, [passedArtwork]);

  const handleChange = (field, value) => {
    setArt((prev) => ({ ...prev, [field]: value }));
  };

  const handleZoom = (url) => setZoomImage(url);
  const closeZoom = () => setZoomImage(null);

  const removeNewImage = (id) => {
    setNewImages((prev) => prev.filter((i) => i.id !== id));
  };

  const handleCropSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setCropModal({ open: true, file, previewUrl });
    }
  };

  const applyCroppedImage = (croppedBlob) => {
    const id = uuid();
    const newImg = {
      id,
      file: new File([croppedBlob], `${id}.jpg`, { type: "image/jpeg" }),
      previewUrl: URL.createObjectURL(croppedBlob),
      displayOrder: "",
    };
    setNewImages((prev) => [...prev, newImg]);
    setCropModal({ open: false, file: null, previewUrl: null });
  };

  const handleSave = async () => {
    const backup = sessionStorage.getItem("last-artwork-edit");
    setUploadProgress(20);

    try {
      const formData = new FormData();

      const newImageMeta = [];
      for (const img of newImages) {
        if (img.file) {
          formData.append("imageFiles", img.file);
          newImageMeta.push({
            fileName: img.file.name,
            displayOrder: parseInt(img.displayOrder || 0),
          });
        }
      }

      const existingImages = (art.images || []).map((img) => ({
        id: img.id,
        imageUrl: img.imageUrl || img.image_url,
        displayOrder: parseInt(img.displayOrder || 0),
      }));

      const artworkDTO = {
        id: art.id,
        title: art.title,
        slug: art.slug,
        size: art.size,
        price: art.price,
        surface: art.surface,
        availability: art.availability,
        description: art.description,
        artistNote: art.artistNote,
        mediums: art.mediums,
        tags: Array.isArray(art.tags)
          ? art.tags.map((t) => t.trim()).filter(Boolean).join(",")
          : "",
        images: existingImages,
      };

      sessionStorage.setItem("last-artwork-edit", JSON.stringify(artworkDTO));
      setNewImages([]);
      formData.append("dto", new Blob([JSON.stringify(artworkDTO)], { type: "application/json" }));
      formData.append("imageFileMeta", new Blob([JSON.stringify(newImageMeta)], { type: "application/json" }));

      setUploadProgress(40);

      const response = await fetch(`/api/admin/artworks/${art.id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        sessionStorage.setItem("last-artwork-edit", backup);
        toast.error(result.message || "❌ Save failed. Changes reverted.");
      } else {
        toast.success(result.message || "✅ Artwork saved!");
      }

      setUploadProgress(100);
    } catch (err) {
      sessionStorage.setItem("last-artwork-edit", backup);
      toast.error("🚨 Save error. Changes reverted.");
      setUploadProgress(0);
    }
  };

  const handleDelete = async () => {
    if (!art.id) return;

    const backup = JSON.stringify(art);
    sessionStorage.removeItem("last-artwork-edit");
    toast.info("Deleting artwork...");
    navigate("/admin/artworks/manage");

    try {
      const response = await fetch(`/api/admin/artworks/${art.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        sessionStorage.setItem("last-artwork-edit", backup);
        toast.error(result.message || "❌ Delete failed. Reverted.");
      } else {
        toast.success(result.message || "✅ Artwork Deleted!");
      }
    } catch (err) {
      sessionStorage.setItem("last-artwork-edit", backup);
      toast.error("🚨 Server error. Delete failed.");
    }
  };

  if (!art) return <p className="p-4 text-center">🌸 Oopsie! This artwork flew away...</p>;

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6 relative">
      <ProgressBar uploadProgress={uploadProgress} setUploadProgress={setUploadProgress} />

      <Card className="rounded-xl shadow border border-pink-100">
        <CardContent className="p-6 space-y-8">
          <section>
            <h3 className="text-xs font-bold text-rose-500 uppercase mb-2 tracking-wider">🧾 Metadata</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Artwork ID" value={art.id} disabled />
              <Input label="Slug" value={art.slug} disabled />
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-rose-500 uppercase mb-2 tracking-wider">🖌️ Basic Info</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Input label="Title" value={art.title} onChange={(e) => handleChange("title", e.target.value)} />
              <Input label="Size" value={art.size} onChange={(e) => handleChange("size", e.target.value)} />
              <Input label="Price (₹)" type="number" value={art.price} onChange={(e) => handleChange("price", e.target.value)} />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Medium(s)</label>
                <MediumDropdown value={art.mediums || []} onChange={(val) => handleChange("mediums", val)} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Surface</label>
                <SurfaceDropdown value={art.surface || ""} onChange={(val) => handleChange("surface", val)} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Availability</label>
                <AvailabilityDropdown value={art.availability || ""} onChange={(val) => handleChange("availability", val)} />
              </div>
              <Input
                label="Tags"
                value={Array.isArray(art.tags) ? art.tags.join(", ") : art.tags}
                onChange={(e) => handleChange("tags", e.target.value)}
              />
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-rose-500 uppercase mb-3 tracking-wider">🖼️ Images</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[...(art.images || []), ...newImages].map((img, index) => (
                <div key={img.id} className="relative group rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <img
                    src={img.previewUrl || img.imageUrl || img.image_url}
                    alt={`img-${index}`}
                    className="w-full h-40 object-cover cursor-zoom-in transition-transform duration-200 group-hover:scale-[1.02]"
                    onClick={() => handleZoom(img.previewUrl || img.imageUrl || img.image_url)}
                  />
                  <div className="p-2 text-sm bg-white space-y-2">
                    <Input
                      label="Display Order"
                      type="number"
                      value={img.displayOrder ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (img.file) {
                          setNewImages((prev) =>
                            prev.map((i) =>
                              i.id === img.id ? { ...i, displayOrder: val } : i
                            )
                          );
                        } else {
                          setArt((prev) => ({
                            ...prev,
                            images: prev.images.map((i) =>
                              i.id === img.id ? { ...i, displayOrder: val } : i
                            ),
                          }));
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="w-full text-xs py-1 bg-rose-100 text-rose-600 rounded hover:bg-rose-200 transition"
                      onClick={() =>
                        img.file
                          ? removeNewImage(img.id)
                          : setArt((prev) => ({
                              ...prev,
                              images: prev.images.filter((i) => i.id !== img.id),
                            }))
                      }
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              ))}
              <label
                title="Add Image"
                className="flex items-center justify-center border-2 border-dashed border-rose-300 rounded-xl h-40 cursor-pointer hover:bg-rose-50 transition-all"
              >
                <span className="text-3xl text-rose-400 font-light">+</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCropSelect}
                  className="hidden"
                />
              </label>
            </div>
          </section>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button className="bg-red-600 text-white" onClick={() => setShowConfirmModal(true)}>🗑️ Delete Artwork</Button>
        <Button className="bg-gray-300 text-black" onClick={() => window.location.reload()}>❌ Cancel</Button>
        <Button className="bg-green-600 text-white" onClick={handleSave}>💾 Save Artwork</Button>
      </div>

      {zoomImage && <ImageZoomModal imageUrl={zoomImage} onClose={closeZoom} />}
      {cropModal.open && (
        <CropModal
          imageSrc={cropModal.previewUrl}
          onCancel={() => setCropModal({ open: false, file: null, previewUrl: null })}
          onCropComplete={applyCroppedImage}
        />
      )}
      {showConfirmModal && (
        <ConfirmModal
          title="Delete Artwork?"
          message="Are you sure you want to permanently delete this artwork? This action cannot be undone."
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={() => {
            setShowConfirmModal(false);
            handleDelete();
          }}
        />
      )}
    </div>
  );
}
