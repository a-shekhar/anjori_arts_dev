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
            .sort((a, b) => a.label.localeCompare(b.label));
          setOptions(formatted);
        } else {
          console.error("Unexpected response format:", res);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch surface options", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={loading}
      className="w-full border border-black rounded px-3 py-[0.6rem] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
    >
      <option value="">{loading ? "Loading..." : "-- Select Surface --"}</option> {/* 👈 Custom placeholder */}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
