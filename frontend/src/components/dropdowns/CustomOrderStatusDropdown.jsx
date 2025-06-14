import React, { useEffect, useState } from "react";

export default function CustomOrderStatusDropdown({ value, onChange, name = "status" }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/custom-order-status")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch order statuses");
        return res.json();
      })
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          const formatted = res.data
            .map((status) => ({
              value: status.code,   // ✅ Your backend uses `code`
              label: status.name    // ✅ Your backend uses `name` (not `label`)
            }))
            .sort((a, b) => a.label.localeCompare(b.label));
          setOptions(formatted);
        } else {
          console.error("Invalid order status response", res);
        }
      })
      .catch((err) => console.error("Error fetching order statuses:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="input"
      disabled={loading}
    >
      <option value="">{loading ? "Loading..." : "Select Order Status"}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
