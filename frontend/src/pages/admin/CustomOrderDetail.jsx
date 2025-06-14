import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { toast } from "react-toastify";
import { ArrowLeft, X } from "lucide-react";
import ArtTypeDropdown from "../../components/dropdowns/ArtTypeDropdown";
import SurfaceDropdown from "../../components/dropdowns/SurfaceDropdown";
import MediumDropdown from "../../components/dropdowns/MediumDropdown";
import BudgetRangeDropdown from "../../components/dropdowns/BudgetRangeDropdown";
import NumberOfCopiesDropdown from "../../components/dropdowns/NumberOfCopiesDropdown";
import CustomOrderStatusDropdown from "../../components/dropdowns/CustomOrderStatusDropdown";


const fallbackImage = "https://placehold.co/300x300?text=No+Image";

export default function CustomOrderDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const passedOrder = location.state?.order;
  const { id } = useParams();

  const [order, setOrder] = useState(() => ({ ...passedOrder }));
  const [isSaving, setIsSaving] = useState(false);
  const [newImageFiles, setNewImageFiles] = useState([]);

  const handleChange = (eOrObj) => {
    const isEvent = !!eOrObj?.target;
    const name = isEvent ? eOrObj.target.name : eOrObj.name;
    const value = isEvent
      ? eOrObj.target.type === "checkbox"
        ? eOrObj.target.checked
        : eOrObj.target.value
      : eOrObj.value;

    setOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddImages = (e) => {
    const files = Array.from(e.target.files || []);
    const previewImages = files.map((file) => ({
      id: `new-${file.name}-${Date.now()}`,
      label: file.name,
      url: URL.createObjectURL(file),
      file
    }));
    setOrder((prev) => ({ ...prev, images: [...(prev.images || []), ...previewImages] }));
    setNewImageFiles((prev) => [...prev, ...previewImages]);
  };

  const handleRemoveImage = (id) => {
    setOrder((prev) => ({ ...prev, images: (prev.images || []).filter((img) => img.id !== id) }));
    setNewImageFiles((prev) => prev.filter((img) => img.id !== id));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      toast.success("✅ Order saved successfully!");
      setIsSaving(false);
      navigate("/admin/custom-orders/manage", { state: { updated: true } });
    }, 1000);
  };

  const handleCancel = () => {
    toast.info("Changes discarded");
    navigate("/admin/custom-orders/manage");
  };

  const handleDelete = () => {
    toast.error("Order deleted (mock)");
    navigate("/admin/custom-orders/manage");
  };

  if (!order) return <div className="p-4">No order found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              🧾 Order Details – {order.id}
          </h1>

       <Button
         onClick={() => navigate(-1)}
         className="flex items-center gap-2 text-sm px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
       >
         <ArrowLeft className="w-4 h-4" /> Back
       </Button>

      </div>

      {/* Buyer Info */}
      <section className="bg-white rounded-xl shadow border p-6 space-y-4">
        <h2 className="text-lg font-semibold text-amber-600">👤 Buyer Info</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Order ID" value={order.id} disabled />
          <Input label="User ID" value={order.userId} disabled />
          <Input label="Name" value={order.name} onChange={(e) => handleChange(e)} name="name" />
          <Input label="Phone" value={order.phone} onChange={(e) => handleChange(e)} name="phone" />
          <Input label="Email" value={order.email} onChange={(e) => handleChange(e)} name="email" />
        </div>
      </section>

      {/* Order Info */}
      <section className="bg-white rounded-xl shadow border p-6 space-y-4">
        <h2 className="text-lg font-semibold text-amber-600">📦 Order Info</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Art Type</label>
            <ArtTypeDropdown value={order.artType} onChange={handleChange} name="artType" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Surface</label>
            <SurfaceDropdown value={order.surface} onChange={(val) => handleChange({ name: "surface", value: val })} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Medium(s)</label>
            <MediumDropdown value={order.medium} onChange={(val) => handleChange({ name: "medium", value: val })} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Budget Range</label>
            <BudgetRangeDropdown name="budget" value={order.budget} onChange={handleChange} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">No. of Copies</label>
            <NumberOfCopiesDropdown name="copies" value={order.copies} onChange={handleChange} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Preferred Size</label>
            <Input value={order.size} onChange={(e) => handleChange(e)} name="size" />
          </div>
        </div>
        <div className="mt-2">
          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              name="suggestOptions"
              checked={order.suggestOptions || false}
              onChange={(e) => handleChange(e)}
            />
            Suggest Surface & Medium
          </label>
        </div>
        <div className="mt-2">
          <Textarea
            label="User Note"
            name="userNote"
            value={order.userNote}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </section>

      {/* Uploaded Images */}
     {/* Uploaded Images Section */}
     <section className="bg-white rounded-xl shadow border p-6 space-y-4">
       <h2 className="text-lg font-semibold text-amber-600 flex items-center gap-2">
         <img src="/icons/image.png" alt="img" className="w-5 h-5" />
         Uploaded Images
       </h2>

       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
         {(order.images || []).map((img) => (
           <div key={img.id} className="relative group rounded-xl shadow-sm border overflow-hidden bg-gray-100">
             <img
               src={img.url || fallbackImage}
               alt=""
               className="w-full h-40 object-cover"
             />
             <button
               onClick={() => handleRemoveImage(img.id)}
               className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
             >
               <X size={14} />
             </button>
           </div>
         ))}

         {/* Add New Image Button */}
         <label className="flex items-center justify-center h-40 border-2 border-dashed border-rose-400 rounded-xl cursor-pointer hover:bg-rose-50 transition-all">
           <span className="text-3xl text-rose-400 font-light">+</span>
           <input
             type="file"
             accept="image/*"
             multiple
             onChange={handleAddImages}
             className="hidden"
           />
         </label>
       </div>
     </section>

      {/* Admin Section */}
      <section className="bg-white rounded-xl shadow border p-6 space-y-4">
        <h2 className="text-lg font-semibold text-amber-600">🛠 Admin Controls</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Quoted Price" value={order.quotedPrice} onChange={(e) => handleChange(e)} name="quotedPrice" />
          <Input label="Agreed Price" value={order.agreedPrice} onChange={(e) => handleChange(e)} name="agreedPrice" />
          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-700 block mb-1">Status</label>

            <CustomOrderStatusDropdown
              value={order.status}
              onChange={handleChange}
            />

          </div>
        </div>
        <Textarea
          label="Admin Note"
          name="adminNote"
          value={order.adminNote}
          onChange={(e) => handleChange(e)}
        />
      </section>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={handleDelete} className="border-red-500 text-red-600">
          🗑 Delete
        </Button>
        <Button variant="outline" onClick={handleCancel}>
          ❌ Cancel
        </Button>
        <Button
          disabled={isSaving}
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={handleSave}
        >
          💾 Save
        </Button>
      </div>
    </div>
  );
}
