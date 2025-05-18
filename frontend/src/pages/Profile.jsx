import { useState, useEffect } from 'react';
import ImageZoomModal from "../components/ImageZoomModal";
import CountryCodeDropdown from "../components/dropdowns/CountryCodeDropdown";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

export default function ProfilePage() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [currentImage, setCurrentImage] = useState('/images/default-profile.png');
  const [newImage, setNewImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileData = {
      username,
      firstName,
      lastName,
      countryCode,
      phoneNo,
    };

    const formData = new FormData();
    formData.append(
      "profile",
      new Blob([JSON.stringify(profileData)], { type: "application/json" })
    );

    if (newImage) {
      formData.append("profileImage", newImage);
    }

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      const result = await response.json();
      if (response.ok && result.success) {
        toast.success(result.message || "Profile updated successfully.");
        const newImageUrl = result.data?.profileImageUrl;
        if (newImageUrl) {
          setCurrentImage(newImageUrl);
        }
        setNewImage(null);
        setPreviewURL(null);
      } else {
        toast.error(result.message || "Profile update failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Internal Server Issue");
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/user/profile', {
        credentials: 'include'
      });

      const contentType = res.headers.get('content-type');
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          console.warn('Unauthorized → redirecting to login');
          navigate('/login');
          return;
        }
        throw new Error(`Server error: ${res.status}`);
      }

      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Expected JSON but received non-JSON response');
      }

      const result = await res.json();
      const data = result.data;

      setUsername(data.username || '');
      setFirstName(data.firstName || '');
      setLastName(data.lastName || '');
      setCountryCode(data.countryCode || '+91');
      setPhoneNo(data.phoneNo || '');
      setEmail(data.email || '');
      setCurrentImage(data.profileImageUrl || '/images/default-profile.png'); // 🔥 Make sure backend sends this
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row max-w-6xl mx-auto p-6 gap-8">
      {/* Left: Artistic Inspiration Image */}
      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 space-y-6">
        <img
          src="/images/Profile3.png"
          onError={(e) => { e.target.src = "/images/default-art.png" }}
          alt="Inspiration"
          className="w-full max-w-sm rounded-xl shadow-lg border border-pink-100 object-contain"
        />
        <p className="text-center text-gray-500 text-sm italic">
          Creativity is the soul's most sincere expression.
        </p>
      </div>

      {/* Right: Profile Form */}
      <div className="flex-1 max-w-xl w-full mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-center text-pink-600">My Profile</h2>

        <div className="flex flex-col items-center">
          <ImageZoomModal
            src={previewURL || currentImage}
            alt="Profile Preview"
            className="w-32 h-32 rounded-full object-cover cursor-pointer border-2 hover:scale-105 transition-all duration-300"
          />
          <label className="mt-2 cursor-pointer">
            <span className="text-sm text-pink-500 underline">Change Photo</span>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
          <small className="text-gray-400 text-xs">Max 2MB • JPG or PNG</small>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm mb-1">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm mb-1">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Phone Number</label>
            <div className="flex gap-2">
              <CountryCodeDropdown value={countryCode} onChange={setCountryCode} />
              <input
                type="text"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                placeholder="Phone number"
                className="flex-1 px-3 py-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full px-3 py-2 border bg-gray-100 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
