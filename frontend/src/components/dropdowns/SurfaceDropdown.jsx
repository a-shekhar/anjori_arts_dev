import React from "react";

export default function SurfaceDropdown({ value, onChange, name = "surface" }) {
  return (
    <select name={name} value={value} onChange={onChange} className="input">
      <option value="">Select Surface</option>
      <option>Canvas</option>
      <option>Paper</option>
      <option>Wood</option>
      <option>Fabric</option>
    </select>
  );
}