import { useParams, useNavigate } from "react-router-dom"; // or useRouter() for Next.js
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { toast } from "react-toastify";

// Dummy detail fetch (you can replace with real fetch later)
const dummyData = {
  id: 1,
  title: "Floral Vibes",
  size: "12x18 in",
  medium: "Acrylic",
  surface: "Canvas",
  price: 1200,
  tags: "flowers, nature",
  description: "A vibrant floral piece representing spring energy.",
  artist_note: "Inspired by a walk through the gardens of Kashmir.",
  availability: "available",
  featured: true,
  slug: "floral-vibes",
  images: [
    {
      id: 1,
      image_url: "https://via.placeholder.com/300x200?text=Floral",
      alt_text: "Floral Art",
      display_order: 1,
      is_main: true
    }
  ]
};

export default function ArtworkDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const art = dummyData; // Simulate fetch by ID
  if (!art) return <p className="p-4">Artwork not found</p>;

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">🖼️ Artwork Detail - #{id}</h1>
        <Button variant="ghost" onClick={() => navigate("/admin/artworks/manage")}>← Back</Button>
      </div>

      <Card className="shadow-sm border">
        <CardContent className="p-6 space-y-6">
          <section>
            <h3 className="text-sm font-semibold text-amber-600 uppercase mb-2">Metadata</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Artwork ID" value={art.id} disabled />
              <Input label="Slug (auto)" value={art.slug} disabled />
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-amber-600 uppercase mb-2">Basic Info</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Input label="Title" value={art.title} />
              <Input label="Size" value={art.size} />
              <Input label="Price (₹)" value={art.price} type="number" />
              <Input label="Medium" value={art.medium} />
              <Input label="Surface" value={art.surface} />
              <Input label="Tags" value={art.tags} />
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-amber-600 uppercase mb-2">Creative</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Textarea label="Description" value={art.description} />
              <Textarea label="Artist Note" value={art.artist_note} />
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-amber-600 uppercase mb-2">Images</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {art.images.map((img) => (
                <div key={img.id} className="border rounded overflow-hidden">
                  <img src={img.image_url} alt={img.alt_text} className="w-full h-36 object-cover" />
                  <div className="p-2 text-sm">
                    <p className="text-gray-600">Alt: {img.alt_text}</p>
                    <p className="text-gray-500">Order: {img.display_order}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => toast.info("Cancel clicked")}>Cancel</Button>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white" onClick={() => toast.success("Saved!")}>
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
