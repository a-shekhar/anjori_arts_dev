import React, { useEffect, useState } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";

export default function MediumDropdown({ value = [], onChange, name = "medium" }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    fetch("/api/mediums")
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          const formatted = res.data
            .map((m) => ({
              value: m.code,
              label: m.name,
            }))
            .sort((a, b) => a.label.localeCompare(b.label)); // ✅ SORT
          setOptions(formatted);
        } else {
          console.error("Invalid medium data:", res);
        }
      })
      .catch((err) => {
        console.error("Medium fetch error:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading && options.length) {
      const mapped = value.map((code) =>
        options.find((opt) => opt.value === code)
      ).filter(Boolean);
      setSelected(mapped);
    }
  }, [value, options, loading]);

  const handleChange = (selectedItems) => {
    setSelected(selectedItems);
    onChange(selectedItems.map((item) => item.value)); // Return only codes
  };

  return (
    <MultiSelectDropdown
      name={name}
      options={options}
      selected={selected}
      onChange={handleChange}
      placeholder={loading ? "Loading..." : "-- Select Medium --"}
    />
  );
}
