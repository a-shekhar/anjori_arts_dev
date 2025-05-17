import React from "react";

export default function ArtTypeDropdown({ value, onChange, name = "artType" }) {
  return (
    <select name={name} value={value} onChange={onChange} className="input">
      <option value="">Select Type of Art</option>
      <option>Mandala</option>
      <option>Portrait</option>
      <option>Abstract</option>
      <option>Landscape</option>
      <option>Modern</option>
      <option>Traditional</option>
    </select>
  );
}