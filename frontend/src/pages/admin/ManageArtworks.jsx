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
      <label className="text-sm font-medium">Availability</label>
      <select
        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
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
      <label className="text-sm font-medium">{label}</label>
      <select
        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
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
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-purple-700 flex items-center gap-2">
          <span role="img" aria-label="palette">🎨</span> Manage Artworks
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-3 p-3 rounded-xl bg-purple-50 shadow-sm border border-purple-200 w-full md:w-auto">
          <select
            className="border rounded-lg bg-white px-3 py-2 text-sm text-purple-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 hover:border-purple-300 transition"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
          >
            <option value="id">ID</option>
            <option value="title">Title</option>
            <option value="tags">Tags</option>
            <option value="medium">Medium</option>
            <option value="description">Description</option>
          </select>
          <div className="relative w-full md:w-80">
            <Input
              placeholder={`Search by ${searchBy}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <SearchIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
      </div>

      <div className="grid gap-8">
        {filteredArtworks.length === 0 && (
          <p className="text-gray-500 italic">No artworks match your search.</p>
        )}

        {filteredArtworks.map((art) => (
          <Card key={art.id} className="shadow-md rounded-xl bg-white ring-1 ring-gray-200 hover:ring-purple-300 transition">
            <CardContent className="p-4 space-y-5">
              {/* 📎 Metadata */}
              <div>
                <h3 className="text-sm font-semibold text-purple-500 uppercase mb-2">📎 Metadata</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="Artwork ID" value={art.id} disabled />
                  <Input label="Slug (auto-generated)" value={art.slug} disabled />
                </div>
              </div>

              {/* 🖼️ Artwork Info */}
              <div>
                <h3 className="text-sm font-semibold text-purple-500 uppercase mb-2">🖼️ Artwork Info</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Input label="Title" value={art.title} onChange={(e) => handleChange(art.id, "title", e.target.value)} />
                  <Input label="Size" value={art.size} onChange={(e) => handleChange(art.id, "size", e.target.value)} />
                  <DropdownField label="Medium" value={art.medium} onChange={(val) => handleChange(art.id, "medium", val)} options={mediumOptions} />
                  <DropdownField label="Surface" value={art.surface} onChange={(val) => handleChange(art.id, "surface", val)} options={surfaceOptions} />
                  <Input label="Price (₹)" type="number" value={art.price} onChange={(e) => handleChange(art.id, "price", e.target.value)} />
                  <Input label="Tags" value={art.tags} onChange={(e) => handleChange(art.id, "tags", e.target.value)} />
                </div>
              </div>

              {/* ✍️ Creative Details */}
              <div>
                <h3 className="text-sm font-semibold text-purple-500 uppercase mb-2">✍️ Creative Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Textarea label="Description" value={art.description} onChange={(e) => handleChange(art.id, "description", e.target.value)} />
                  <Textarea label="Artist Note" value={art.artist_note} onChange={(e) => handleChange(art.id, "artist_note", e.target.value)} />
                </div>
              </div>

              {/* ⚙️ Controls */}
              <div>
                <h3 className="text-sm font-semibold text-purple-500 uppercase mb-2">⚙️ Controls</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Featured</span>
                    <Switch checked={art.featured} onCheckedChange={(value) => handleChange(art.id, "featured", value)} />
                  </div>
                  <AvailabilityDropdown
                    value={art.availability}
                    onChange={(value) => handleChange(art.id, "availability", value)}
                  />
                </div>
              </div>

              {/* 🖼️ Images */}
              <div>
                <h3 className="text-sm font-semibold text-purple-500 uppercase mb-2">🖼️ Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {art.images.map((img) => (
                    <div
                      key={img.id}
                      className={`relative border rounded-xl overflow-hidden group ${
                        img.is_main ? "ring-2 ring-purple-500" : ""
                      }`}
                    >
                      <img
                        src={img.image_url}
                        alt={img.alt_text || "Artwork Image"}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute top-1 right-1 flex gap-1">
                        <button className="p-1 bg-white rounded-full shadow">
                          <Pencil size={16} />
                        </button>
                        <button className="p-1 bg-white rounded-full shadow text-red-600">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="p-2 bg-gray-50 text-xs flex flex-col gap-1">
  <div className="flex justify-between items-center gap-2">
    <span>Alt:</span>
    <input
      type="text"
      value={img.alt_text}
      onChange={(e) => updateImageField(art.id, img.id, "alt_text", e.target.value)}
      className="text-xs p-1 border rounded w-full"
    />
  </div>
  <div className="flex justify-between items-center gap-2">
    <span>Order:</span>
    <input
      type="number"
      value={img.display_order}
      onChange={(e) => updateImageField(art.id, img.id, "display_order", parseInt(e.target.value))}
      className="text-xs p-1 border rounded w-full"
    />
  </div>
</div>
                    </div>
                  ))}
                  <button className="flex flex-col justify-center items-center h-32 border rounded-xl border-dashed text-gray-500 hover:text-black hover:border-gray-400">
                    <ImagePlus />
                    <span className="text-xs">Add Image</span>
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
