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

  const clearAll = () => {
    onChange([]);
    setIsOpen(false);
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
    <div className="relative w-full" ref={dropdownRef}>
      {/* Main button */}
      <div
        className="border border-black rounded-md px-3 py-2 text-sm bg-white min-h-[2.5rem] w-full flex items-center justify-between flex-wrap cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selected.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selected.map((item) => (
              <span
                key={item}
                className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-sm text-gray-400">-- Select Options --</span>
        )}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto border border-gray-300 bg-white rounded-md shadow text-sm">
          {[...options].sort().map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-orange-50 active:bg-orange-100 focus-visible:bg-orange-100"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                className="accent-orange-500 w-4 h-4"
              />
              <span>{option}</span>
            </label>
          ))}

          {/* Clear All */}
          {selected.length > 0 && (
            <div className="border-t px-3 py-2 text-right bg-white">
              <button
                type="button"
                onClick={clearAll}
                className="text-xs text-red-600 hover:underline focus:outline-none"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
