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
    <select
      name={name || "medium"}
      multiple
      value={value}
      onChange={handleChange}
      className="w-full border border-black rounded px-3 py-[0.6rem] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 h-40"
    >
      {[...mediumOptions].sort().map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
