import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { toast } from "react-toastify";
import SurfaceDropdown from "../../components/dropdowns/SurfaceDropdown";
import AvailabilityDropdown from "../../components/dropdowns/AvailabilityDropdown";
import MediumDropdown from "../../components/dropdowns/MediumDropdown";
import ImageZoomModal from "../../components/ImageZoomModal";
import CropModal from "../../components/CropModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
    };
  });

  const [newImages, setNewImages] = useState([]);
  const [zoomImage, setZoomImage] = useState(null);
  const [cropModal, setCropModal] = useState({ open: false, file: null, previewUrl: null });

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

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      const response = await fetch(`/api/admin/artworks/${art.id}/images/${imageId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok && result.success) {
        toast.success(result.message || "Image deleted.");
        const updatedImages = art.images.filter((img) => img.id !== imageId);
        setArt((prev) => ({ ...prev, images: updatedImages }));
        sessionStorage.setItem("last-artwork-edit", JSON.stringify({ ...art, images: updatedImages }));
      } else {
        toast.error(result.message || "Failed to delete image.");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Delete failed: " + err.message);
    }
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

  const handleReorder = (result) => {
    if (!result.destination) return;
    const combined = [...(art.images || []), ...newImages];
    const [moved] = combined.splice(result.source.index, 1);
    combined.splice(result.destination.index, 0, moved);
    setArt((prev) => ({ ...prev, images: combined.filter((i) => !i.file) }));
    setNewImages(combined.filter((i) => i.file));
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      // 🧠 1. Prepare new image files and build metadata list
      const newImageMeta = [];

      for (const img of newImages) {
        if (img.file) {
          formData.append("imageFiles", img.file); // file itself
          newImageMeta.push({
            fileName: img.file.name,
            displayOrder: parseInt(img.displayOrder || 0)
          });
        }
      }

      // 🧠 2. Prepare existing image metadata (id, url, displayOrder)
      const existingImages = (art.images || []).map((img) => ({
        id: img.id,
        imageUrl: img.imageUrl || img.image_url,
        displayOrder: parseInt(img.displayOrder || 0)
      }));

      // 🧠 3. Build the artwork DTO
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
        tags: Array.isArray(art.tags) ? art.tags.join(", ") : art.tags,
        images: existingImages
      };

      // 🧾 4. Append main parts to FormData
      formData.append("dto", new Blob([JSON.stringify(artworkDTO)], { type: "application/json" }));
      formData.append("imageFileMeta", new Blob([JSON.stringify(newImageMeta)], { type: "application/json" }));

      // 🚀 5. Send to backend
      const response = await fetch(`/api/admin/artworks/${art.id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("✅ Artwork updated!");
        setNewImages([]); // clear uploaded
        sessionStorage.setItem("last-artwork-edit", JSON.stringify(result.updatedArtwork || artworkDTO));
      } else {
        toast.error(result.message || "❌ Failed to update.");
      }
    } catch (err) {
      console.error("Save failed:", err);
      toast.error("🚨 Error: " + err.message);
    }
  };



  if (!art) return <p className="p-4 text-center">🌸 Oopsie! This artwork flew away...</p>;

  const combinedImages = [...(art.images || []), ...newImages];

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-rose-600">🎨 Artwork Detail - #{art.id}</h1>
        <Button variant="ghost" onClick={() => navigate("/admin/artworks/manage")}>← Go Back</Button>
      </div>

      <Card className="rounded-xl shadow border border-pink-100">
        <CardContent className="p-6 space-y-8">

          <section>
            <h3 className="text-xs font-bold text-rose-500 uppercase mb-2 tracking-wider">🧾 Metadata</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Artwork ID" value={art.id} disabled />
              <Input label="Slug" value={art.slug} onChange={(e) => handleChange("slug", e.target.value)} />
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-rose-500 uppercase mb-2 tracking-wider">🖌️ Basic Info</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Input label="Title" value={art.title} onChange={(e) => handleChange("title", e.target.value)} />
              <Input label="Size" value={art.size} onChange={(e) => handleChange("size", e.target.value)} />
              <Input label="Price (₹)" value={art.price} type="number" onChange={(e) => handleChange("price", e.target.value)} />
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
              <Input label="Tags" value={Array.isArray(art.tags) ? art.tags.join(", ") : art.tags} onChange={(e) => handleChange("tags", e.target.value)} />
            </div>
          </section>

         <section>
           <h3 className="text-xs font-bold text-rose-500 uppercase mb-3 tracking-wider">🖼️ Images</h3>
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

             {/* Existing Images */}
             {combinedImages.map((img, index) => (
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
                       img.file ? removeNewImage(img.id) : handleDeleteImage(img.id)
                     }
                   >
                     Delete
                   </button>
                 </div>
               </div>
             ))}

             {/* Upload Image Card */}
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


          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            <Button className="bg-pink-500 hover:bg-red-500 text-white" onClick={handleDeleteImage}>🗑️ Delete Artwork</Button>
            <Button variant="outline" onClick={() => navigate("/admin/artworks/manage")}> ❌ Cancel</Button>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white" onClick={handleSave}> 💾 Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      {zoomImage && <ImageZoomModal imageUrl={zoomImage} onClose={closeZoom} />}
      {cropModal.open && (
        <CropModal
          imageSrc={cropModal.previewUrl}
          onCancel={() => setCropModal({ open: false, file: null, previewUrl: null })}
          onCropComplete={applyCroppedImage}
        />
      )}
    </div>
  );
}
