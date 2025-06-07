import React from "react";

const surfaceOptions = ["Canvas", "Paper", "Wood", "Fabric", "Tote Bag"];

export default function SurfaceDropdown({ value, onChange, name }) {
  return (
    <select
      name={name || "surface"}
      value={value}
      onChange={onChange}
      className="w-full border border-black rounded px-3 py-[0.6rem] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
    >
      <option value="">Select Surface</option>
      {[...surfaceOptions].sort().map((surface) => (
        <option key={surface} value={surface}>
          {surface}
        </option>
      ))}
    </select>
  );
}
