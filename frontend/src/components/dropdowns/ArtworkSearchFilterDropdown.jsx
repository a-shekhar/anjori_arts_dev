// ✅ ArtworkSearchFilterDropdown.jsx (for backend pagination)
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search as SearchIcon } from "lucide-react";

export default function ArtworkSearchFilterDropdown({ onSearch }) {
  const [searchBy, setSearchBy] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim().length === 0) return;
    setLoading(true);
    onSearch(searchBy, searchTerm.trim());
    setTimeout(() => setLoading(false), 300); // optional visual debounce
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
      <select
        className="border rounded-lg px-3 py-2 text-sm bg-white w-full sm:w-auto"
        value={searchBy}
        onChange={(e) => setSearchBy(e.target.value)}
      >
        <option value="id">ID</option>
        <option value="title">Title</option>
      </select>

      <div className="relative w-full">
        <Input
          placeholder={`Search by ${searchBy}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10"
        />
        <SearchIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>

      <Button
        onClick={handleSearch}
        disabled={loading || searchTerm.trim() === ""}
        className="w-full sm:w-auto"
      >
        {loading ? "Searching..." : "Search"}
      </Button>
    </div>
  );
}
