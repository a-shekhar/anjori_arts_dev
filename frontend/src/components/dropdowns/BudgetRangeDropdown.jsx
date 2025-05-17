import React from "react";

export default function BudgetRangeDropdown({ value, onChange, name = "budget" }) {
  return (
    <select name={name} value={value} onChange={onChange} className="input">
      <option value="">Select Budget Range</option>
      <option>₹500 – ₹1000</option>
      <option>₹1000 – ₹2000</option>
      <option>₹2000 – ₹5000</option>
      <option>₹5000+</option>
    </select>
  );
}