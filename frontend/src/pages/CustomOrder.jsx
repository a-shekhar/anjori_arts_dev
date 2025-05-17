import { useState } from "react";
import ArtTypeDropdown from "../components/dropdowns/ArtTypeDropdown";
import BudgetRangeDropdown from "../components/dropdowns/BudgetRangeDropdown";
import SurfaceDropdown from "../components/dropdowns/SurfaceDropdown";
import MediumDropdown from "../components/dropdowns/MediumDropdown";
import NumberOfCopiesDropdown from "../components/dropdowns/NumberOfCopiesDropdown";
import CountryCodeDropdown from "../components/dropdowns/CountryCodeDropdown";
import { toast } from "react-toastify";

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
    preferredSize: "",
    noOfCopies: "",
    additionalNotes: "",
    suggestOptions: false,
    referenceImages: []
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ loading: false });

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : name === "referenceImages" ? files : value;
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validateField = (name, value) => {
    // switch (name) {
    //   case "firstName":
    //   case "lastName":
    //     return value.trim() === "" ? "This field is required" : "";
    //   case "email":
    //     if (!value.trim()) return "Email is required";
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return !emailRegex.test(value) ? "Invalid email format" : "";
    //   case "phoneNo":
    //     if (!value.trim()) return "";
    //     const phoneRegex = /^[0-9]{10}$/;
    //     return !phoneRegex.test(value) ? "Phone must be 10 digits" : "";
    //   case "artType":
    //   case "budget":
    //     return value === "" ? "This field is required" : "";
    //   case "noOfCopies":
    //     return !value || parseInt(value) < 1 ? "Please select at least 1 copy" : "";
    //   case "preferredSize":
    //     return value.trim() === "" ? "Please specify the preferred size" : "";
    //   default:
    //     return "";
    // }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = {};
    for (const field in formData) {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    }

    // Mark all fields as touched
    setTouched(
      Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    // If errors exist, show them and stop
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Some details are missing or invalid. Please fix them before submitting.");
      return;
    }

    // Show loading state
    setStatus({ loading: true });
    const loadingToastId = toast.loading("Submitting your custom order...");

    try {
      const { referenceImages, ...orderDetails } = formData;

      // Build multipart form data
      const formPayload = new FormData();
      formPayload.append(
        "order",
        new Blob([JSON.stringify(orderDetails)], { type: "application/json" })
      );

      if (referenceImages && referenceImages.length > 0) {
        for (const file of referenceImages) {
          formPayload.append("images", file);
        }
      }

      const res = await fetch("/api/custom-order", {
        method: "POST",
        body: formPayload,
      });

      const result = await res.json();

      setStatus({ loading: false });
      toast.dismiss(loadingToastId);

      if (!res.ok) {
        throw new Error(result.message || "Submission failed");
      }

      toast.success(result.message || "Your custom order has been submitted!");
    } catch (err) {
      setStatus({ loading: false });
      toast.dismiss();

      const errorMsg = err.message || "Something went wrong while submitting your order.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 md:px-16 bg-white">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800">🎨 Have something in mind?</h1>
          <p className="text-gray-600">Submit a custom order request and we'll bring your imagination to life!</p>
          <img
            src="/images/Canvas.png"
            alt="Custom Order"
            className="w-full max-w-sm mx-auto md:mx-0 hidden md:block"
          />
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-2xl shadow-md space-y-4 w-full">
          <p className="text-sm text-violet-700 font-medium bg-violet-50 p-2 rounded-lg">
            If you're unsure about any field, feel free to leave it blank — we'll connect with you via email or WhatsApp!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="input" />
            <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="input" />
          </div>

          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input" />

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

          <ArtTypeDropdown value={formData.artType} onChange={handleChange} />

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

          <input
            name="preferredSize"
            placeholder="Preferred Size (e.g. 12x16 inches)"
            value={formData.preferredSize}
            onChange={handleChange}
            className="input"
          />

          <NumberOfCopiesDropdown value={formData.noOfCopies} onChange={handleChange} name="noOfCopies" />

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
            <p className="text-xs text-gray-500 italic">
              Uploading images is optional — but helpful for visualizing your request.
            </p>
            {formData.referenceImages.length > 0 && (
              <p className="text-xs text-green-600">{formData.referenceImages.length} file(s) selected</p>
            )}
          </div>

          <textarea
            name="additionalNotes"
            rows="3"
            placeholder="Additional Notes"
            className="input"
            value={formData.additionalNotes}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={status.loading}
            className="bg-violet-600 text-white px-4 py-2 rounded-xl hover:bg-violet-700 transition"
          >
            {status.loading ? "Submitting..." : "Submit Custom Order"}
          </button>

          <p className="text-xs text-gray-500 text-center mt-2 italic">
            Want to view your order history and track orders?{" "}
            <a href="/login" className="font-medium text-violet-600 hover:underline">Login or Sign Up</a> for a more professional experience.
          </p>

        </form>
      </div>
    </div>
  );
}
