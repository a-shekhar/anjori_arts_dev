import React from "react";

export default function MediumDropdown({ value, onChange, name = "medium" }) {
  return (
    <select name={name} value={value} onChange={onChange} className="input">
      <option value="">Select Medium</option>
      <option>Acrylic</option>
      <option>Oil</option>
      <option>Watercolor</option>
      <option>Ink</option>
      <option>Charcoal</option>
      <option>Mixed Media</option>
    </select>
  );
}