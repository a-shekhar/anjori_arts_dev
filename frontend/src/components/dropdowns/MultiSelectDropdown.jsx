import React, { useState, useRef, useEffect } from "react";

export default function MultiSelectDropdown({
  name,
  options = [],
  selected = [],
  onChange,
  placeholder = "Select Options"
}) {
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
      {/* Display area that matches input field */}
      <div
        className="w-full border border-black text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white cursor-pointer min-h-[2.5rem]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length === 0 ? (
          <span className="text-gray-400">-- {placeholder} --</span>
        ) : (
          <div className="flex flex-wrap gap-1">
            {selected.map((item) => (
              <span
                key={item}
                className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full max-h-56 overflow-auto border border-gray-300 rounded-md shadow bg-white text-sm">
          {[...options].sort().map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 px-3 py-2 hover:bg-orange-50 cursor-pointer"
            >
              <input
                type="checkbox"
                className="accent-orange-500"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
