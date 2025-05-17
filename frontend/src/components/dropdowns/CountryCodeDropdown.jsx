import React from "react";

const countryCodes = [
  { code: "+91", name: "🇮🇳" },
];

export default function CountryCodeDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 border rounded bg-white text-sm"
    >
      {countryCodes.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name} ({country.code})
        </option>
      ))}
    </select>
  );
}
