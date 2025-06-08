import React, { useEffect, useState } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";

export default function MediumDropdown({ value = [], onChange, name = "medium" }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

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
            .sort((a, b) => a.label.localeCompare(b.label));
          const withEmptyOption = [{ value: "", label: "No Choice" }, ...formatted]; // 👈
          setOptions(withEmptyOption);
        } else {
          console.error("Unexpected response format:", res);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch mediums", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <MultiSelectDropdown
      name={name}
      options={options}
      selected={value}
      onChange={onChange}
      placeholder={loading ? "Loading..." : "-- Select Medium --"}
    />
  );
}
