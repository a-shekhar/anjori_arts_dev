import { useState, useEffect } from "react";

export default function CustomOrderPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    artType: "",
    size: "",
    budget: "",
    copies: "",
    notes: "",
    referenceImages: [],
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ loading: false, message: "", type: "" });

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
        return value.trim() === "" ? "This field is required" : "";

      case "email":
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? "Invalid email format" : "";

      case "phone":
        if (!value.trim()) return "";
        const phoneRegex = /^[0-9]{10}$/;
        return !phoneRegex.test(value) ? "Phone must be 10 digits" : "";

      case "artType":
      case "budget":
      case "copies":
        return value === "" ? "This field is required" : "";

      case "size":
        return value.trim() === "" ? "Please specify the preferred size" : "";

      default:
        return "";
    }
  };

  useEffect(() => {
    const newErrors = {};
    for (const field in formData) {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    }
    setErrors(newErrors);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const updatedValue = name === "referenceImages" ? files : value;

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

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
        type: "success",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen px-4 py-8 md:px-16 bg-white">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* Left illustration */}
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800">🎨 Have something in mind?</h1>
          <p className="text-gray-600">
            Submit a custom order request and we’ll bring your imagination to life!
          </p>
          <img
            src="/images/Canvas.png"
            alt="Custom Order"
            className="w-full max-w-sm mx-auto md:mx-0"
          />
        </div>

        {/* Right form */}
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-2xl shadow-md space-y-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="input"
              />
              {touched.firstName && errors.firstName && (
                <p className="text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="input"
              />
              {touched.lastName && errors.lastName && (
                <p className="text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input"
            />
            {touched.email && errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <input
            type="text"
            name="phone"
            placeholder="Phone (optional)"
            value={formData.phone}
            onChange={handleChange}
            className="input"
          />
          {touched.phone && errors.phone && (
            <p className="text-sm text-red-600">{errors.phone}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <select name="artType" className="input" value={formData.artType} onChange={handleChange}>
                <option value="">Select Type of Art</option>
                <option>Portrait</option>
                <option>Abstract</option>
                <option>Landscape</option>
                <option>Modern</option>
                <option>Traditional</option>
              </select>
              {touched.artType && errors.artType && (
                <p className="text-sm text-red-600">{errors.artType}</p>
              )}
            </div>
            <div>
              <select name="budget" className="input" value={formData.budget} onChange={handleChange}>
                <option value="">Select Budget Range</option>
                <option>₹500 – ₹1000</option>
                <option>₹1000 – ₹2000</option>
                <option>₹2000 – ₹5000</option>
                <option>₹5000+</option>
                <option>Need Quotation?</option>
              </select>
              {touched.budget && errors.budget && (
                <p className="text-sm text-red-600">{errors.budget}</p>
              )}
            </div>
          </div>

          <input
            type="text"
            name="size"
            placeholder="Preferred Size (e.g. 12x16 inches)"
            value={formData.size}
            onChange={handleChange}
            className="input"
          />
          {touched.size && errors.size && (
            <p className="text-sm text-red-600">{errors.size}</p>
          )}

          <select name="copies" className="input" value={formData.copies} onChange={handleChange}>
            <option value="">No. of Copies</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1}>{i + 1}</option>
            ))}
            <option>10+</option>
          </select>
          {touched.copies && errors.copies && (
            <p className="text-sm text-red-600">{errors.copies}</p>
          )}

          {/* Upload Image Styled */}
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
              <p className="text-xs text-green-600">
                {formData.referenceImages.length} file(s) selected
              </p>
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
            className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
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
