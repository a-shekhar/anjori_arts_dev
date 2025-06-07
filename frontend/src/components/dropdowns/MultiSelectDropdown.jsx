import React, { useState, useRef, useEffect } from "react";

export default function MultiSelectDropdown({ name, options = [], selected = [], onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleOption = (option) => {
    const updated = selected.includes(option)
      ? selected.filter((o) => o !== option)
      : [...selected, option];
    onChange(updated);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full relative" ref={dropdownRef}>
      <div
        className="border border-black rounded-md px-3 py-2 cursor-pointer min-h-[2.5rem] bg-white"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selected.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {selected.map((item) => (
              <span
                key={item}
                className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-sm text-gray-400">-- Select Options --</span> // ✅ Clean placeholder
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full border border-gray-300 rounded-md shadow bg-white max-h-56 overflow-auto">
          {[...options].sort().map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                className="accent-orange-500"
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
