import React, { useEffect, useState } from "react";

export default function ArtTypeDropdown({ value, onChange, name = "artType" }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/art-types")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch art types");
        return res.json();
      })
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          const formatted = res.data
            .map((art) => ({
              value: art.code,   // Assuming `code` is unique identifier
              label: art.name    // Assuming `name` is display text
            }))
            .sort((a, b) => a.label.localeCompare(b.label)); // ✅ Sorted
          setOptions(formatted);
        } else {
          console.error("Invalid art type response", res);
        }
      })
      .catch((err) => console.error("Error fetching art types:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="input"
      disabled={loading}
    >
      <option value="">{loading ? "Loading..." : "Select Type of Art"}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
