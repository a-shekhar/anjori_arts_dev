import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import { Pencil, Trash2, ImagePlus, Search as SearchIcon } from "lucide-react";

function AvailabilityDropdown({ value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-600">Availability</label>
      <select
        className="border rounded-lg px-3 py-2 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="Available">Available</option>
        <option value="Sold">Sold</option>
        <option value="Not for Sale">Not for Sale</option>
        <option value="Archived">Archived</option>
      </select>
    </div>
  );
}

function DropdownField({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <select
        className="border rounded-lg px-3 py-2 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

export default function ManageArtworksPage() {
  const [searchBy, setSearchBy] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");
  const [artworks, setArtworks] = useState([
    {
      id: 1,
      title: "Serenity",
      size: "24x36",
      medium: "Oil",
      surface: "Canvas",
      price: 4500.0,
      slug: "serenity",
      description: "A calm lakeside view",
      artist_note: "Inspired by mornings in Kashmir",
      availability: "Available",
      featured: true,
      tags: "nature,green,oil",
      images: [
        {
          id: 11,
          image_url: "https://placehold.co/300x200",
          alt_text: "Serene lake",
          display_order: 0,
          is_main: true
        }
      ]
    }
  ]);

  const updateImageField = (artId, imgId, field, value) => {
    setArtworks(prev =>
      prev.map(art => art.id === artId
        ? {
            ...art,
            images: art.images.map(img =>
              img.id === imgId ? { ...img, [field]: value } : img
            )
          }
        : art
      )
    );
  };

  const handleChange = (id, field, value) => {
    setArtworks(prev =>
      prev.map(art => art.id === id ? { ...art, [field]: value } : art)
    );
  };

  const filteredArtworks = artworks.filter((art) => {
    const term = searchTerm.toLowerCase();
    if (searchBy === "id") return String(art.id).includes(term);
    if (searchBy === "title") return art.title.toLowerCase().includes(term);
    if (searchBy === "tags") return art.tags.toLowerCase().includes(term);
    if (searchBy === "medium") return art.medium.toLowerCase().includes(term);
    if (searchBy === "description") return art.description.toLowerCase().includes(term);
    return true;
  });

  const mediumOptions = ["Oil", "Acrylic", "Watercolor", "Ink", "Charcoal"];
  const surfaceOptions = ["Canvas", "Paper", "Wood", "Board", "Fabric"];

  return (
    <div className="p-4 md:p-6 space-y-6 font-sans">
      {/* Header + Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-800 font-heading flex items-center gap-2">
          🎨 Manage Artworks
        </h1>
        <div className="flex flex-col sm:flex-row gap-2 p-3 rounded-xl bg-gray-50 shadow-sm border border-gray-200 w-full md:w-auto">
          <select
            className="border rounded-lg bg-white px-3 py-2 h-10 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 hover:border-gray-300 transition w-full sm:w-auto"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
          >
            <option value="id">ID</option>
            <option value="title">Title</option>
            <option value="tags">Tags</option>
            <option value="medium">Medium</option>
            <option value="description">Description</option>
          </select>
          <div className="relative w-full sm:w-72">
            <Input
              placeholder={`Search by ${searchBy}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10"
            />
            <SearchIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
      </div>

      {/* Artworks List */}
      <div className="grid gap-8">
        {filteredArtworks.length === 0 && (
          <p className="text-gray-500 italic">No artworks match your search.</p>
        )}

        {filteredArtworks.map((art) => (
          <Card key={art.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <CardContent className="p-4 space-y-6">
              {/* 📎 Metadata */}
              <section>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">📎 Metadata</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="Artwork ID" value={art.id} disabled />
                  <Input label="Slug (auto-generated)" value={art.slug} disabled />
                </div>
              </section>

              {/* 🖼️ Artwork Info */}
              <section>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">🖼️ Artwork Info</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Input label="Title" value={art.title} onChange={(e) => handleChange(art.id, "title", e.target.value)} />
                  <Input label="Size" value={art.size} onChange={(e) => handleChange(art.id, "size", e.target.value)} />
                  <DropdownField label="Medium" value={art.medium} onChange={(val) => handleChange(art.id, "medium", val)} options={mediumOptions} />
                  <DropdownField label="Surface" value={art.surface} onChange={(val) => handleChange(art.id, "surface", val)} options={surfaceOptions} />
                  <Input label="Price (₹)" type="number" value={art.price} onChange={(e) => handleChange(art.id, "price", e.target.value)} />
                  <Input label="Tags" value={art.tags} onChange={(e) => handleChange(art.id, "tags", e.target.value)} />
                </div>
              </section>

              {/* ✍️ Creative Details */}
              <section>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">✍️ Creative Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Textarea label="Description" value={art.description} onChange={(e) => handleChange(art.id, "description", e.target.value)} />
                  <Textarea label="Artist Note" value={art.artist_note} onChange={(e) => handleChange(art.id, "artist_note", e.target.value)} />
                </div>
              </section>

              {/* ⚙️ Controls */}
              <section>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">⚙️ Controls</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Featured</label>
                    <Switch
                      checked={art.featured}
                      onCheckedChange={(value) => handleChange(art.id, "featured", value)}
                      className="mt-1 sm:mt-0"
                    />
                  </div>
                  <AvailabilityDropdown
                    value={art.availability}
                    onChange={(value) => handleChange(art.id, "availability", value)}
                  />
                </div>
              </section>

              {/* 🖼️ Images */}
              <section>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">🖼️ Images</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {art.images.map((img) => (
                    <div key={img.id} className={`relative border rounded-xl overflow-hidden group ${img.is_main ? "ring-2 ring-gray-600" : ""}`}>
                      <img src={img.image_url} alt={img.alt_text || "Artwork"} className="w-full h-32 object-cover" />
                      <div className="absolute top-1 right-1 flex gap-1">
                        <button className="p-1 bg-white rounded-full shadow"><Pencil size={16} /></button>
                        <button className="p-1 bg-white rounded-full shadow text-red-600"><Trash2 size={16} /></button>
                      </div>
                      <div className="p-2 bg-gray-50 text-xs space-y-2">
                        <div className="flex flex-col">
                          <label className="mb-1 text-[11px] text-gray-500">Alt Text</label>
                          <input type="text" value={img.alt_text} onChange={(e) => updateImageField(art.id, img.id, "alt_text", e.target.value)} className="text-xs p-1 border rounded w-full" />
                        </div>
                        <div className="flex flex-col">
                          <label className="mb-1 text-[11px] text-gray-500">Display Order</label>
                          <input type="number" value={img.display_order} onChange={(e) => updateImageField(art.id, img.id, "display_order", parseInt(e.target.value))} className="text-xs p-1 border rounded w-full" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="flex flex-col justify-center items-center h-32 border rounded-xl border-dashed text-gray-500 hover:text-black hover:border-gray-400">
                    <ImagePlus />
                    <span className="text-xs">Add Image</span>
                  </button>
                </div>
              </section>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 w-full">
                <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
                <Button className="w-full sm:w-auto">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
