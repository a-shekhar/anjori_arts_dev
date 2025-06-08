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
            .sort((a, b) => a.label.localeCompare(b.label)); // 🔁 Sorted alphabetically
          setOptions(formatted);
        } else {
          console.error("Invalid availability data structure:", res);
        }
      })
      .catch((err) => {
        console.error("Error loading availability options:", err);
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
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
