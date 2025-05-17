// pages/CustomOrderPage.jsx
import { useState } from "react";
import ArtTypeDropdown from "../components/dropdowns/ArtTypeDropdown";
import BudgetRangeDropdown from "../components/dropdowns/BudgetRangeDropdown";
import SurfaceDropdown from "../components/dropdowns/SurfaceDropdown";
import MediumDropdown from "../components/dropdowns/MediumDropdown";
import NumberOfCopiesDropdown from "../components/dropdowns/NumberOfCopiesDropdown";
import CountryCodeDropdown from "../components/dropdowns/CountryCodeDropdown";

export default function CustomOrderPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    phoneNo: "",
    artType: "",
    surface: "",
    medium: "",
    budget: "",
    size: "",
    copies: "",
    notes: "",
    suggestOptions: false,
    referenceImages: []
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ loading: false, message: "", type: "" });

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : name === "referenceImages" ? files : value;
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
        return value.trim() === "" ? "This field is required" : "";
      case "email":
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? "Invalid email format" : "";
      case "phoneNo":
        if (!value.trim()) return "";
        const phoneRegex = /^[0-9]{10}$/;
        return !phoneRegex.test(value) ? "Phone must be 10 digits" : "";
      case "artType":
      case "budget":
        return value === "" ? "This field is required" : "";
      case "copies":
        return !value || parseInt(value) < 1 ? "Please select at least 1 copy" : "";
      case "size":
        return value.trim() === "" ? "Please specify the preferred size" : "";
      default:
        return "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    for (const field in formData) {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    }
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus({ loading: true, message: "", type: "" });
    setTimeout(() => {
      setStatus({
        loading: false,
        message: "Your custom order has been submitted!",
        type: "success"
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen px-4 py-8 md:px-16 bg-white">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* Header and image */}
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800">🎨 Have something in mind?</h1>
          <p className="text-gray-600">Submit a custom order request and we'll bring your imagination to life!</p>
          <img
            src="/images/Canvas.png"
            alt="Custom Order"
            className="w-full max-w-sm mx-auto md:mx-0 hidden md:block"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-2xl shadow-md space-y-4 w-full">
          <p className="text-sm text-violet-700 font-medium bg-violet-50 p-2 rounded-lg">
            If you're unsure about any field, feel free to leave it blank — we'll connect with you via email or WhatsApp!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="input" />
            <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="input" />
          </div>
          {touched.firstName && errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
          {touched.lastName && errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}

          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input" />
          {touched.email && errors.email && <p className="text-sm text-red-600">{errors.email}</p>}

          <div className="flex gap-2 w-full">
            <CountryCodeDropdown value={formData.countryCode} onChange={handleChange} />
            <input
              name="phoneNo"
              type="tel"
              placeholder="Phone (optional)"
              value={formData.phoneNo}
              onChange={handleChange}
              className="input flex-1"
            />
          </div>
          {touched.phoneNo && errors.phoneNo && <p className="text-sm text-red-600">{errors.phoneNo}</p>}

          <ArtTypeDropdown value={formData.artType} onChange={handleChange} />
          {touched.artType && errors.artType && <p className="text-sm text-red-600">{errors.artType}</p>}

          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="suggestOptions"
              name="suggestOptions"
              checked={formData.suggestOptions}
              onChange={handleChange}
              className="mt-1"
            />
            <label htmlFor="suggestOptions" className="text-sm text-gray-700">
              I'd like the artist to suggest the best surface and medium.
              <span className="ml-1 text-xs text-gray-400">(Don't worry if you're unsure — just check this!)</span>
            </label>
          </div>

          {!formData.suggestOptions && <SurfaceDropdown value={formData.surface} onChange={handleChange} />}
          {!formData.suggestOptions && <MediumDropdown value={formData.medium} onChange={handleChange} />}

          <BudgetRangeDropdown value={formData.budget} onChange={handleChange} />
          {touched.budget && errors.budget && <p className="text-sm text-red-600">{errors.budget}</p>}

          <input
            name="size"
            placeholder="Preferred Size (e.g. 12x16 inches)"
            value={formData.size}
            onChange={handleChange}
            className="input"
          />
          {touched.size && errors.size && <p className="text-sm text-red-600">{errors.size}</p>}

          <NumberOfCopiesDropdown value={formData.copies} onChange={handleChange} />
          {touched.copies && errors.copies && <p className="text-sm text-red-600">{errors.copies}</p>}

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Upload Images</label>
            <div className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-600">You can upload multiple images.</p>
              <label className="relative cursor-pointer bg-violet-100 hover:bg-violet-200 text-violet-700 font-medium py-1 px-3 rounded-md text-sm">
                Choose Files
                <input
                  type="file"
                  name="referenceImages"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={handleChange}
                />
              </label>
            </div>
            {formData.referenceImages.length > 0 && (
              <p className="text-xs text-green-600">{formData.referenceImages.length} file(s) selected</p>
            )}
          </div>

          <textarea
            name="notes"
            rows="3"
            placeholder="Additional Notes"
            className="input"
            value={formData.notes}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={status.loading}
            className="bg-violet-600 text-white px-4 py-2 rounded-xl hover:bg-violet-700 transition"
          >
            {status.loading ? "Submitting..." : "Submit Custom Order"}
          </button>

          {status.message && (
            <p className={`text-sm ${status.type === "success" ? "text-green-600" : "text-red-600"}`}>
              {status.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}