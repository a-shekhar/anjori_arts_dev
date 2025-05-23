import React, { useState } from 'react';

const STATUS_OPTIONS = ['PENDING', 'REVIEWED', 'PAID', 'FULFILLED'];

export default function OrderStatusDropdown({ currentStatus, onChange }) {
  const [status, setStatus] = useState(currentStatus);

  const handleChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    if (onChange) onChange(newStatus); // callback to parent if needed
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      className="border rounded px-2 py-1 text-sm bg-white"
    >
      {STATUS_OPTIONS.map((option) => (
        <option key={option} value={option}>
          {option.charAt(0) + option.slice(1).toLowerCase()}
        </option>
      ))}
    </select>
  );
}
