import React, { useEffect, useState } from "react";

export default function AvailabilityDropdown({ value, onChange, name = "availability" }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/availability")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch availability options");
        return res.json();
      })
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          const formatted = res.data
            .map((item) => ({
              value: item.code,
              label: item.name,
            }))
            .sort((a, b) => a.label.localeCompare(b.label)); // ✅ SORT
          setOptions(formatted);
        } else {
          console.error("Invalid availability data:", res);
        }
      })
      .catch((err) => {
        console.error("Availability fetch error:", err);
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
      <option value="">{loading ? "Loading..." : "Select availability"}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
