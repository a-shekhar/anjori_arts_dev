import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search as SearchIcon } from "lucide-react";
import { useLoading } from "../context/LoadingContext";

export default function ArtworkSearchFilterDropdown({ onSearch }) {
  const [searchBy, setSearchBy] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");
  const { setUploadProgress } = useLoading();

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    if (trimmed.length === 0) return;

    if (searchBy === "id" && !/^\d+$/.test(trimmed)) {
      alert("Please enter a valid numeric ID.");
      return;
    }

    setUploadProgress(70);
    onSearch(searchBy, trimmed);
    setTimeout(() => {
      setUploadProgress(100);
      setTimeout(() => setUploadProgress(0), 400);
    }, 300);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-stretch sm:items-end">
      {/* Dropdown */}
      <select
        className="border rounded px-3 text-sm bg-white w-full sm:w-auto h-10"
        value={searchBy}
        onChange={(e) => setSearchBy(e.target.value)}
      >
        <option value="id">ID</option>
        <option value="title">Title</option>
      </select>

      {/* Input with icon */}
      <div className="w-full h-10 flex items-center border rounded px-3 bg-white">
        <SearchIcon className="text-gray-400 mr-2" size={18} />
        <input
          type="text"
          placeholder={`Search by ${searchBy}...`}
          value={searchTerm}
          onChange={(e) => {
            if (searchBy === "id") {
              const val = e.target.value;
              if (val === "" || /^\d+$/.test(val)) setSearchTerm(val);
            } else {
              setSearchTerm(e.target.value);
            }
          }}
          onKeyDown={handleKeyDown}
          className="flex-1 text-base outline-none placeholder-gray-400"
        />
      </div>


      {/* Search button */}
      <Button
        onClick={handleSearch}
        disabled={searchTerm.trim() === ""}
        className="w-full sm:w-auto h-10 text-base font-semibold"
      >
        Search
      </Button>
    </div>
  );
}
