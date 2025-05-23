import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

const searchOptions = ["Order ID", "Name", "Email", "Phone", "Status"];
const statusOptions = ["New", "Reviewed", "Quoted", "In Progress", "Fulfilled", "Cancelled"];

const mockCustomOrders = [
  {
    id: "CUS-1001",
    userId: "U123",
    name: "Riya Mehra",
    phone: "9876543210",
    email: "riya@example.com",
    description: "Painting of a Rajasthani village.",
    preferences: "Warm tones, 24x36, oil on canvas",
    status: "New",
    placedAt: "2025-05-24",
    artType: "Portrait",
    medium: "Oil",
    surface: "Canvas",
    size: "12x16",
    budget: "₹5000",
    copies: 1,
    suggestOptions: "Yes",
    userNote: "Please use bright colors.",
    quotedPrice: "5500",
    agreedPrice: "5300",
    adminNote: "",
    images: [
      { id: 1, label: "Order image 1", url: "https://placehold.co/100x100" },
      { id: 2, label: "Order image 2", url: "https://placehold.co/100x100" },
    ],
  },
  {
    id: "CUS-1002",
    userId: "U456",
    name: "Aman Singh",
    phone: "9876500000",
    email: "aman@example.com",
    description: "Radha Krishna painting for pooja room.",
    preferences: "Bright colors, gold frame, 18x24",
    status: "Reviewed",
    placedAt: "2025-05-22",
    artType: "Devotional",
    medium: "Acrylic",
    surface: "Canvas",
    size: "18x24",
    budget: "₹6000",
    copies: 1,
    suggestOptions: "No",
    userNote: "Frame it nicely.",
    quotedPrice: "6500",
    agreedPrice: "6000",
    adminNote: "",
    images: [{ id: 1, label: "Reference image", url: "https://placehold.co/100x100" }],
  },
  {
    id: "CUS-1003",
    userId: "U789",
    name: "Neha Kapoor",
    phone: "9123456789",
    email: "neha@example.com",
    description: "Custom Ganesh abstract art.",
    preferences: "Modern style, red/white theme, 20x30",
    status: "Quoted",
    placedAt: "2025-05-20",
    artType: "Abstract",
    medium: "Oil",
    surface: "Wood",
    size: "20x30",
    budget: "₹7000",
    copies: 2,
    suggestOptions: "Yes",
    userNote: "Try different textures.",
    quotedPrice: "7500",
    agreedPrice: "7000",
    adminNote: "",
    images: [],
  },
];

export default function ManageCustomOrdersPage() {
  const [expandedId, setExpandedId] = useState(null);
  const [orders, setOrders] = useState(mockCustomOrders);
  const [searchBy, setSearchBy] = useState("Order ID");
  const [searchTerm, setSearchTerm] = useState("");

  const updateField = (id, field, value) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, [field]: value } : order
      )
    );
  };

  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.toLowerCase();
    if (searchBy === "Order ID") return order.id.toLowerCase().includes(term);
    if (searchBy === "Name") return order.name.toLowerCase().includes(term);
    if (searchBy === "Email") return order.email.toLowerCase().includes(term);
    if (searchBy === "Phone") return order.phone.toLowerCase().includes(term);
    if (searchBy === "Status") return order.status.toLowerCase().includes(term);
    return true;
  });

  return (
    <div className="p-4 md:p-6 space-y-6 font-sans">
      {/* Header & Search */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-800 font-heading flex items-center gap-2">
          🎨 Manage Custom Orders
        </h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <select
            className="border rounded-lg px-3 py-2 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
          >
            {searchOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <Input
            className="h-10 w-full sm:w-72"
            placeholder={`Search by ${searchBy}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredOrders.map((order, index) => (
          <div
            key={order.id}
            className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
          >
            {/* Card header */}
            <div className="mb-4 border-b pb-2">
              <h2 className="text-md font-bold text-amber-600">
                Order #{index + 1} — <span className="text-gray-700">{order.id}</span>
              </h2>
              <p className="text-xs text-gray-500">Placed on: {order.placedAt}</p>
            </div>

            {/* Basic Info */}
            <div className="space-y-1 text-sm text-gray-700">
              <p className="font-semibold">{order.name}</p>
              <p className="text-sm">{order.phone}</p>
              <p className="text-xs text-gray-500">{order.email}</p>
              <p className="text-xs">User ID: {order.userId}</p>
              <p className="text-sm">
                <span className="font-medium text-gray-700">Status:</span> {order.status}
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-4">
              <Button
                variant="outline"
                className="text-sm"
                onClick={() =>
                  setExpandedId((prev) => (prev === order.id ? null : order.id))
                }
              >
                {expandedId === order.id ? "Hide" : "View"}
              </Button>
              <Button className="text-sm bg-teal-600 hover:bg-teal-700 text-white">
                Save
              </Button>
            </div>

            {/* Expanded Fields */}
            {expandedId === order.id && (
              <div className="mt-4 border-t pt-4 space-y-4 text-sm text-gray-700">
                <section>
                  <h3 className="text-sm font-semibold text-amber-600 mb-2">👤 Buyer Info</h3>
                  <label>Name</label>
                  <Input value={order.name} onChange={(e) => updateField(order.id, "name", e.target.value)} />
                  <label>Phone</label>
                  <Input value={order.phone} onChange={(e) => updateField(order.id, "phone", e.target.value)} />
                  <label>Email</label>
                  <Input value={order.email} onChange={(e) => updateField(order.id, "email", e.target.value)} />
                </section>

                <section>
                  <h3 className="text-sm font-semibold text-amber-600 mb-2">📦 Order Info</h3>
                  <label>Art Type</label>
                  <Input value={order.artType} onChange={(e) => updateField(order.id, "artType", e.target.value)} />
                  <label>Medium</label>
                  <Input value={order.medium} onChange={(e) => updateField(order.id, "medium", e.target.value)} />
                  <label>Surface</label>
                  <Input value={order.surface} onChange={(e) => updateField(order.id, "surface", e.target.value)} />
                  <label>Preferred Size</label>
                  <Input value={order.size} onChange={(e) => updateField(order.id, "size", e.target.value)} />
                  <label>Budget</label>
                  <Input value={order.budget} onChange={(e) => updateField(order.id, "budget", e.target.value)} />
                  <label>No. of Copies</label>
                  <Input value={order.copies} onChange={(e) => updateField(order.id, "copies", e.target.value)} />
                  <label>Suggest Options (Yes/No)</label>
                  <Input value={order.suggestOptions} onChange={(e) => updateField(order.id, "suggestOptions", e.target.value)} />
                  <label>User Note</label>
                  <Textarea value={order.userNote} onChange={(e) => updateField(order.id, "userNote", e.target.value)} />
                </section>

                <section>
                  <h3 className="text-sm font-semibold text-amber-600 mb-2">🖼 Uploaded Images</h3>
                  <div className="flex flex-wrap gap-2">
                    {order.images.map((img) => (
                      <div key={img.id} className="flex flex-col items-center border p-2 rounded">
                        <img src={img.url} alt={img.label} className="w-24 h-24 object-cover rounded" />
                        <p className="text-xs text-gray-600 mt-1">{img.label}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-semibold text-amber-600 mb-2">🛠 Admin Controls</h3>
                  <label>Quoted Price</label>
                  <Input value={order.quotedPrice} onChange={(e) => updateField(order.id, "quotedPrice", e.target.value)} />
                  <label>Agreed Price</label>
                  <Input value={order.agreedPrice} onChange={(e) => updateField(order.id, "agreedPrice", e.target.value)} />
                  <label>Status</label>
                  <select
                    value={order.status}
                    onChange={(e) => updateField(order.id, "status", e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <label>Admin Note</label>
                  <Textarea value={order.adminNote} onChange={(e) => updateField(order.id, "adminNote", e.target.value)} />
                </section>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <p className="text-center text-gray-500 italic mt-12">No matching custom orders found.</p>
      )}
    </div>
  );
}
