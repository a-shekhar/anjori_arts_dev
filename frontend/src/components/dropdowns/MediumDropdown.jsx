import React from "react";

export const mediumOptions = [
  "Acrylic",
  "Charcoal",
  "Fabric",
  "Ink",
  "Oil",
  "Watercolor",
  "Mixed Media",
];

export default function MediumDropdown({ value = [], onChange, name }) {
  const handleChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    onChange(selectedOptions);
  };

  return (
    <div className="w-full relative">
      <select
        name={name || "medium"}
        multiple
        value={value}
        onChange={handleChange}
        className="w-full border border-black rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 h-40"
      >
        {value.length === 0 && (
          <option disabled hidden value="">
            -- Select Medium --
          </option>
        )}
        {[...mediumOptions].sort().map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
