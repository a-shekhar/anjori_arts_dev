import React from "react";

export default function NumberOfCopiesDropdown({ value, onChange, name = "copies" }) {
  return (
    <select name={name} value={value} onChange={onChange} className="input">
      <option value="">No. of Copies</option>
      {[...Array(10)].map((_, i) => (
        <option key={i + 1} value={i + 1}>{i + 1}</option>
      ))}
      <option value="10+">10+</option>
    </select>
  );
}