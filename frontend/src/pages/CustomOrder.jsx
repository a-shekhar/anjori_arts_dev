import { useState, useEffect } from "react";
import { useAuth } from "../components/context/AuthContext";
import { useLoading } from "../components/context/LoadingContext";
import ArtTypeDropdown from "../components/dropdowns/ArtTypeDropdown";
import BudgetRangeDropdown from "../components/dropdowns/BudgetRangeDropdown";
import SurfaceDropdown from "../components/dropdowns/SurfaceDropdown";
import MediumDropdown from "../components/dropdowns/MediumDropdown";
import NumberOfCopiesDropdown from "../components/dropdowns/NumberOfCopiesDropdown";
import CountryCodeDropdown from "../components/dropdowns/CountryCodeDropdown";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CustomOrderPage() {
  const { user } = useAuth();
  const { setUploadProgress } = useLoading();
  const isGuest = !user;

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    countryCode: user?.countryCode || "+91",
    phoneNo: String(user?.phoneNo || ""),
    artType: "",
    surface: "",
    mediums: [],
    budget: "",
    preferredSize: "",
    noOfCopies: "",
    additionalNotes: "",
    suggestOptions: false,
    referenceImages: [],
    userId: user?.userId || null,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ loading: false });
  const [imagePreviews, setImagePreviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.referenceImages && formData.referenceImages.length > 0) {
      const previews = formData.referenceImages.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setImagePreviews(previews);
      return () => previews.forEach((p) => URL.revokeObjectURL(p.url));
    } else {
      setImagePreviews([]);
    }
  }, [formData.referenceImages]);

  const handleRemoveImage = (indexToRemove) => {
    const updatedFiles = Array.from(formData.referenceImages).filter(
      (_, index) => index !== indexToRemove
    );
    setFormData((prev) => ({
      ...prev,
      referenceImages: updatedFiles,
    }));
    setTouched((prev) => ({ ...prev, referenceImages: true }));
  };

  const handleChange = (eOrObj) => {
    const isEvent = !!eOrObj?.target;
    const name = isEvent ? eOrObj.target.name : eOrObj.name;
    const type = isEvent ? eOrObj.target.type : null;
    const checked = isEvent ? eOrObj.target.checked : null;
    const value = isEvent ? eOrObj.target.value : eOrObj.value;
    const files = isEvent ? eOrObj.target.files : null;

    let updatedValue = type === "checkbox" ? checked : value;
    if (Array.isArray(value)) updatedValue = value;

    if (name === "suggestOptions" && updatedValue) {
      setFormData((prev) => ({
        ...prev,
        suggestOptions: true,
        surface: "",
        mediums: [],
      }));
      setTouched((prev) => ({ ...prev, suggestOptions: true }));
      return;
    }

    if (name === "referenceImages") {
      const existingFiles = formData.referenceImages || [];
      const newFiles = Array.from(files);
      const uniqueFiles = newFiles.filter(
        (newFile) =>
          !existingFiles.some(
            (existing) =>
              existing.name === newFile.name &&
              existing.size === newFile.size &&
              existing.lastModified === newFile.lastModified
          )
      );
      setFormData((prev) => ({
        ...prev,
        referenceImages: [...existingFiles, ...uniqueFiles],
      }));
      setTouched((prev) => ({ ...prev, referenceImages: true }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    for (const field in formData) {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    }
    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (Object.keys(newErrors).length > 0) {
      toast.error("Some details are missing or invalid. Please fix them before submitting.");
      return;
    }

    setStatus({ loading: true });
    setUploadProgress(10);
    try {
      const { referenceImages, ...orderDetails } = formData;
      const formPayload = new FormData();
      formPayload.append("order", new Blob([JSON.stringify(orderDetails)], { type: "application/json" }));
      if (referenceImages && referenceImages.length > 0) {
        for (const file of referenceImages) {
          formPayload.append("images", file);
        }
      }
      setUploadProgress(30);
      const res = await fetch("/api/custom-order", {
        method: "POST",
        body: formPayload,
      });
      setUploadProgress(70);
      const result = await res.json();
      const orderId = result.data?.customOrderId;
      setUploadProgress(90);
      setStatus({ loading: false });
      if (res.ok && result.success && orderId) {
        navigate('/order-confirmed', { state: { orderId } });
      } else {
        toast.error(result.message || 'Request could not proceed.');
      }
    } catch (err) {
      setStatus({ loading: false });
      toast.dismiss();
      toast.error(err.message || "Something went wrong while submitting your order.");
    } finally {
      setUploadProgress(100);
      setTimeout(() => setUploadProgress(0), 500);
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        return value.trim() === "" ? "First Name is required" : "";
      case "lastName":
        return value.trim() === "" ? "Last Name is required" : "";
      case "email":
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? "Invalid email format" : "";
      case "phoneNo":
        if (!value.trim()) return "";
        const phoneRegex = /^[0-9]{10}$/;
        return !phoneRegex.test(value) ? "Phone must be 10 digits" : "";
      case "budget":
        return value === "" ? "This field is required" : "";
      case "noOfCopies":
        return !value || parseInt(value) < 1 ? "Please select at least 1 copy" : "";
      case "preferredSize":
        return value.trim() === "" ? "Please specify the preferred size" : "";
      case "mediums":
        return ""; // optional
      case "artType":
        return ""; // made optional
      default:
        return "";
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
            <div>
              <input
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
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input"
            />
            {touched.email && errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="flex gap-2 w-full">
            <CountryCodeDropdown value={formData.countryCode} onChange={handleChange} />
            <div className="flex-1">
              <input
                name="phoneNo"
                type="tel"
                placeholder="Phone (optional)"
                value={formData.phoneNo}
                onChange={handleChange}
                className="input w-full"
              />
              {touched.phoneNo && errors.phoneNo && (
                <p className="text-sm text-red-600">{errors.phoneNo}</p>
              )}
            </div>
          </div>

          <div>
            <ArtTypeDropdown value={formData.artType} onChange={handleChange} />
            {touched.artType && errors.artType && (
              <p className="text-sm text-red-600">{errors.artType}</p>
            )}
          </div>

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

          {!formData.suggestOptions && (
            <>
              <div>
                <SurfaceDropdown
                  value={formData.surface}
                  onChange={(val) => handleChange({ target: { name: "surface", value: val } })}
                />
                {touched.surface && errors.surface && (
                  <p className="text-sm text-red-600">{errors.surface}</p>
                )}
              </div>
              <div>
                <MediumDropdown
                  value={formData.mediums}
                  onChange={(selectedCodes) =>
                    handleChange({ name: "mediums", value: selectedCodes })
                  }
                />
                {touched.mediums && errors.mediums && (
                  <p className="text-sm text-red-600">{errors.mediums}</p>
                )}
              </div>
            </>
          )}

          <div>
            <BudgetRangeDropdown value={formData.budget} onChange={handleChange} />
            {touched.budget && errors.budget && (
              <p className="text-sm text-red-600">{errors.budget}</p>
            )}
          </div>

          <div>
            <input
              name="preferredSize"
              placeholder="Preferred Size (e.g. 12x16 inches)"
              value={formData.preferredSize}
              onChange={handleChange}
              className="input"
            />
            {touched.preferredSize && errors.preferredSize && (
              <p className="text-sm text-red-600">{errors.preferredSize}</p>
            )}
          </div>

          <div>
            <NumberOfCopiesDropdown value={formData.noOfCopies} onChange={handleChange} name="noOfCopies" />
            {touched.noOfCopies && errors.noOfCopies && (
              <p className="text-sm text-red-600">{errors.noOfCopies}</p>
            )}
          </div>

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
            {touched.referenceImages && errors.referenceImages && (
              <p className="text-sm text-red-600">{errors.referenceImages}</p>
            )}

            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-2">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview.url}
                      alt={`preview-${index}`}
                      className="w-20 h-20 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <textarea
              name="additionalNotes"
              rows="3"
              placeholder="Additional Notes"
              className="input"
              value={formData.additionalNotes}
              onChange={handleChange}
            />
            {touched.additionalNotes && errors.additionalNotes && (
              <p className="text-sm text-red-600">{errors.additionalNotes}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="bg-violet-600 text-white px-4 py-2 rounded-xl hover:bg-violet-700 transition"
          >
            {status.loading ? "Submitting..." : "Submit Custom Order"}
          </button>

          {isGuest && (
            <p className="text-xs text-gray-500 text-center mt-2 italic">
              Want to edit this order, view your order history and track orders?{" "}
              <a href="/login" className="font-medium text-violet-600 hover:underline">
                Login or Sign Up
              </a>{" "}
              for a more professional experience.
            </p>
          )}
        </form>

      </div>
    </div>
  );
}
