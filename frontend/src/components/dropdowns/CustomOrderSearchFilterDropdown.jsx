import { useState } from "react";
import { Input } from "../ui/input";

const searchOptions = ["Order ID", "Name", "Email", "Phone"];

export default function CustomOrderSearchFilterDropdown({
  defaultSearchBy = "Order ID",
  defaultSearchTerm = "",
  onChange,
}) {
  const [searchBy, setSearchBy] = useState(defaultSearchBy);
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);

  const handleSearch = () => {
    if (onChange) onChange(searchBy, searchTerm);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-end">
      <select
        className="border border-gray-300 rounded px-3 py-2 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        value={searchBy}
        onChange={(e) => {
          setSearchBy(e.target.value);
        }}
      >
        {searchOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <Input
        className="h-10 w-64"
        placeholder={`Search by ${searchBy}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
    </div>
  );
}
