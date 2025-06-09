import React, { useEffect, useState } from "react";

export default function SurfaceDropdown({ value, onChange, name = "surface" }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/surfaces")
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          const formatted = res.data
            .map((s) => ({
              value: s.code,
              label: s.name,
            }))
            .sort((a, b) => a.label.localeCompare(b.label)); // ✅ SORT
          setOptions(formatted);
        } else {
          console.error("Invalid surface data:", res);
        }
      })
      .catch((err) => {
        console.error("Surface fetch error:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <select
      name={name}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      disabled={loading}
      className="w-full border border-black rounded px-3 py-[0.6rem] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
    >
      <option value="">{loading ? "Loading..." : "Select surface"}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
