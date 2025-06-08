import { useState, useCallback, useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import ArtworkSearchFilterDropdown from "../../components/dropdowns/ArtworkSearchFilterDropdown";

export default function ManageArtworksPage() {
  const [artworks, setArtworks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useState({ searchBy: "title", searchTerm: "" });
  const navigate = useNavigate();

  // Load from sessionStorage
  useEffect(() => {
    const cached = sessionStorage.getItem("manage-artworks-cache");
    if (cached) {
      const { artworks, totalPages, currentPage, searchParams } = JSON.parse(cached);
      setArtworks(artworks || []);
      setTotalPages(totalPages || 0);
      setCurrentPage(currentPage || 0);
      setSearchParams(searchParams || { searchBy: "title", searchTerm: "" });
    }
  }, []);

  const saveCache = (updated) => {
    sessionStorage.setItem(
      "manage-artworks-cache",
      JSON.stringify({
        artworks: updated.artworks,
        totalPages: updated.totalPages,
        currentPage,
        searchParams,
      })
    );
  };

  const fetchArtworks = async () => {
    const { searchBy, searchTerm } = searchParams;
    if (!searchTerm.trim()) return;

    try {
      const response = await fetch(`/api/artworks/search?page=${currentPage}&size=9`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchBy, searchTerm: searchTerm.trim() }),
      });

      const json = await response.json();
      if (json.success && Array.isArray(json.data?.content)) {
        setArtworks(json.data.content);
        setTotalPages(json.data.totalPages);
        saveCache({
          artworks: json.data.content,
          totalPages: json.data.totalPages,
        });
      } else {
        setArtworks([]);
        setTotalPages(0);
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setArtworks([]);
      setTotalPages(0);
    }
  };

  useEffect(() => {
    if (searchParams.searchTerm.trim()) {
      fetchArtworks();
    }
  }, [currentPage, searchParams]);

  const handleSearch = useCallback((searchBy, searchTerm) => {
    const newParams = { searchBy, searchTerm };
    setSearchParams(newParams);
    setCurrentPage(0);

    const cached = sessionStorage.getItem("manage-artworks-cache");
    const parsed = cached ? JSON.parse(cached) : {};
    sessionStorage.setItem(
      "manage-artworks-cache",
      JSON.stringify({
        ...parsed,
        searchParams: newParams,
        currentPage: 0
      })
    );
  }, []);

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">🎨 Manage Artworks</h1>
        <ArtworkSearchFilterDropdown
          onSearch={handleSearch}
          defaultSearchBy={searchParams.searchBy}
          defaultSearchTerm={searchParams.searchTerm}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((art) => {
          const sortedMediums = Array.isArray(art.mediums)
            ? art.mediums.map((m) => m.name).filter(Boolean).sort().join(", ")
            : "N/A";
          const mainImage = art.images?.find((img) => parseInt(img.displayOrder) === 0) || art.images?.[0];

          return (
            <Card key={art.id} className="hover:shadow-md transition flex flex-col justify-between">
              <CardContent className="p-4 space-y-3 flex flex-col h-full">
                <img
                  src={mainImage?.imageUrl || "/placeholder.jpg"}
                  alt={art.slug || art.title}
                  className="w-full h-auto max-h-64 object-contain rounded-t-xl bg-white"
                />
                <h2 className="text-lg font-semibold text-gray-800 truncate">{art.title}</h2>
                <p className="text-sm text-gray-600">
                  {art.size} • {sortedMediums} on {art.surface?.name || "N/A"}
                </p>
                <div className="text-sm font-bold text-teal-600">₹ {art.price}</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {Array.isArray(art.tags) && art.tags.length > 0 ? (
                    art.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400 italic">No tags</span>
                  )}
                </div>
                <div className="mt-auto pt-4">
                  <Button
                    onClick={() => navigate(`/admin/artworks/${art.id}`, { state: { artwork: art } })}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
                  >
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {artworks.length === 0 && (
        <p className="text-center text-gray-500 italic mt-4">No artworks found.</p>
      )}

      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Prev
          </Button>

          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={currentPage === i ? "default" : "outline"}
              onClick={() => setCurrentPage(i)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
