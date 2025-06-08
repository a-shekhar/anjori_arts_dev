import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { toast } from "react-toastify";
import SurfaceDropdown from "../../components/dropdowns/SurfaceDropdown";
import AvailabilityDropdown from "../../components/dropdowns/AvailabilityDropdown";
import MediumDropdown from "../../components/dropdowns/MediumDropdown";

export default function ArtworkDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const passedArtwork = location.state?.artwork;
  const [art, setArt] = useState(passedArtwork);

  useEffect(() => {
    sessionStorage.setItem("last-artwork-edit", JSON.stringify(passedArtwork));
  }, [passedArtwork]);

  if (!art) return <p className="p-4 text-center">🌸 Oopsie! This artwork flew away...</p>;

  const handleChange = (field, value) => {
    setArt((prev) => ({ ...prev, [field]: value }));
  };

  const handleDropdownChange = (field) => (selected) => {
    setArt((prev) => ({
      ...prev,
      [field]: Array.isArray(selected) ? selected : selected,
    }));
  };

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-rose-600">🎨 Artwork Detail - #{art.id}</h1>
        <Button variant="ghost" onClick={() => navigate("/admin/artworks/manage")}>
          ← Go Back
        </Button>
      </div>

      <Card className="rounded-xl shadow border border-pink-100">
        <CardContent className="p-6 space-y-8">
          <section>
            <h3 className="text-xs font-bold text-rose-500 uppercase mb-2 tracking-wider">🧾 Metadata</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Artwork ID" value={art.id} disabled />
              <Input
                label="Slug"
                value={art.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
              />
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-rose-500 uppercase mb-2 tracking-wider">🖌️ Basic Info</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Input
                label="Title"
                value={art.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
              <Input
                label="Size"
                value={art.size}
                onChange={(e) => handleChange("size", e.target.value)}
              />
              <Input
                label="Price (₹)"
                value={art.price}
                type="number"
                onChange={(e) => handleChange("price", e.target.value)}
              />

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Medium(s)</label>
                <MediumDropdown
                  value={art.mediums || []}
                  onChange={handleDropdownChange("mediums")}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Surface</label>
                <SurfaceDropdown
                  value={art.surface?.code || ""}
                  onChange={(selected) =>
                    handleChange("surface", {
                      code: selected?.value,
                      name: selected?.label,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Availability</label>
                <AvailabilityDropdown
                  value={art.availability?.code || ""}
                  onChange={(selected) =>
                    handleChange("availability", {
                      code: selected?.value,
                      name: selected?.label,
                    })
                  }
                />
              </div>

              <Input
                label="Tags"
                value={Array.isArray(art.tags) ? art.tags.join(", ") : art.tags}
                onChange={(e) => handleChange("tags", e.target.value)}
              />
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-rose-500 uppercase mb-2 tracking-wider">📝 Creative</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Textarea
                label="Description"
                value={art.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
              <Textarea
                label="Artist Note"
                value={art.artistNote}
                onChange={(e) => handleChange("artistNote", e.target.value)}
              />
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-rose-500 uppercase mb-2 tracking-wider">🖼️ Images</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {art.images?.map((img) => (
                <div key={img.id} className="border rounded-lg overflow-hidden shadow-sm">
                  <img
                    src={img.imageUrl || img.image_url}
                    alt={art.slug}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3 text-sm bg-rose-50 space-y-2">
                    <Input
                      label="Display Order"
                      type="number"
                      value={img.displayOrder || ""}
                      onChange={(e) =>
                        handleChange(
                          "images",
                          art.images.map((i) =>
                            i.id === img.id ? { ...i, displayOrder: e.target.value } : i
                          )
                        )
                      }
                    />
                    {parseInt(img.displayOrder) === 0 && (
                      <p className="text-teal-600 text-xs font-semibold">Main Image</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            <Button
              className="bg-red-400 hover:bg-red-500 text-white"
              onClick={() => toast.error("💣 Delete action triggered (dummy for now)")}
            >
              ❌ Delete
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.info("Cancelled. Nothing changed 😊")}
            >
              Cancel
            </Button>
            <Button
              className="bg-teal-600 hover:bg-teal-700 text-white"
              onClick={() => toast.success("💾 Saved! You did amazing, admin!")}
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
