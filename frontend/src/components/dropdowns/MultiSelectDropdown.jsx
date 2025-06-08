import React, { useState, useRef, useEffect } from "react";

export default function MultiSelectDropdown({
  name,
  options = [],
  selected = [],
  onChange,
  placeholder = "-- Select Options --",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const isNoChoiceSelected = selected.includes("");

  const toggleOption = (value) => {
    let updated = [];

    if (value === "") {
      // Selecting "No Choice" — clear all and only keep ""
      updated = selected.includes("") ? [] : [""];
    } else {
      // Remove "No Choice" if any real option is selected
      updated = selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected.filter((v) => v !== ""), value];
    }

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
      <div
        className="border border-black rounded-md px-3 py-2 text-sm bg-white min-h-[2.5rem] w-full flex items-center justify-between flex-wrap cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selected.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selected.map((value, index) => {
              const label = options.find((opt) => opt.value === value)?.label || value;
              return (
                <span
                  key={`${value}-${index}`}
                  className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full"
                >
                  {label}
                </span>
              );
            })}
          </div>
        ) : (
          <span className="text-sm text-gray-400">{placeholder}</span>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto border border-gray-300 bg-white rounded-md shadow text-sm">
          {options.length === 0 ? (
            <div className="px-3 py-2 text-gray-400">No options available</div>
          ) : (
            options.map((opt, index) => {
              const isDisabled = isNoChoiceSelected && opt.value !== "";
              return (
                <label
                  key={`${opt.value}-${index}`}
                  className={`flex items-center gap-2 px-3 py-2
                    ${isDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:bg-orange-50 active:bg-orange-100"}`}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(opt.value)}
                    disabled={isDisabled}
                    onChange={() => toggleOption(opt.value)}
                    className="accent-orange-500 w-4 h-4"
                  />
                  <span>{opt.label}</span>
                </label>
              );
            })
          )}

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
