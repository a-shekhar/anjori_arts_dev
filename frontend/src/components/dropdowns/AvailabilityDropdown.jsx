import React from "react";

const availabilityOptions = [
  "Available",
  "Ready for Request",
  "Sold",
  "Archived",
];

export default function AvailabilityDropdown({ value, onChange, name }) {
  return (
    <select
      name={name || "availability"}
      value={value}
      onChange={onChange}
      className="w-full border border-black rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
    >
      {[...availabilityOptions].sort().map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
