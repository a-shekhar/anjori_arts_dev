import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const mockOrders = [
  {
    id: "ORD-2025-0001",
    buyer: {
      name: "Rahul Sharma",
      phone: "9876543210",
      email: "rahul@example.com",
    },
    artwork: {
      title: "Sunrise Over Ganges",
      thumbnail: "https://placehold.co/100x100",
      price: 4999,
    },
    status: "Pending",
    placedAt: "2025-05-24",
  },
  {
    id: "ORD-2025-0002",
    buyer: {
      name: "Aditi Verma",
      phone: "7890123456",
      email: "aditi@example.com",
    },
    artwork: {
      title: "Festival of Lights",
      thumbnail: "https://placehold.co/100x100",
      price: 3499,
    },
    status: "Shipped",
    placedAt: "2025-05-22",
  },
];

const statusOptions = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
const searchOptions = ["Order ID", "Buyer Name", "Status"];

export default function ManageOrdersPage() {
  const [searchBy, setSearchBy] = useState("Order ID");
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState(mockOrders);
  const [expandedId, setExpandedId] = useState(null);

  const updateStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.toLowerCase();
    if (searchBy === "Order ID") return order.id.toLowerCase().includes(term);
    if (searchBy === "Buyer Name") return order.buyer.name.toLowerCase().includes(term);
    if (searchBy === "Status") return order.status.toLowerCase().includes(term);
    return true;
  });

  return (
    <div className="p-4 md:p-6 space-y-6 font-sans">
      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-800 font-heading flex items-center gap-2">
          🧾 Manage Orders
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

      {/* Order Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredOrders.map((order, index) => (
          <div
            key={order.id}
            className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
          >
            {/* Card Header */}
            <div className="mb-4 border-b pb-2">
              <h2 className="text-md font-bold text-amber-600">
                Order #{index + 1} — <span className="text-gray-700">{order.id}</span>
              </h2>
              <p className="text-xs text-gray-500">Placed on: {order.placedAt}</p>
            </div>

            <div className="flex gap-4 items-start">
              <img
                src={order.artwork.thumbnail}
                alt="Artwork thumbnail"
                className="w-20 h-20 object-cover rounded border"
              />
              <div className="space-y-1 text-sm text-gray-700">
                <h3 className="font-semibold">{order.artwork.title}</h3>
                <p>{order.buyer.name}</p>
                <p className="text-xs text-gray-400">{order.buyer.phone}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <div>
                <span className="font-medium text-gray-700">Email:</span> {order.buyer.email}
              </div>
              <div>
                <span className="font-medium text-gray-700">Price:</span> ₹{order.artwork.price}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Status:</span>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

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
                Update
              </Button>
            </div>

            {expandedId === order.id && (
              <div className="mt-4 border-t pt-4 text-sm text-gray-600 space-y-2">
                <div><span className="font-medium">Buyer Email:</span> {order.buyer.email}</div>
                <div><span className="font-medium">Artwork:</span> {order.artwork.title}</div>
                <div><span className="font-medium">Price:</span> ₹{order.artwork.price}</div>
                <div><span className="font-medium">Placed:</span> {order.placedAt}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <p className="text-center text-gray-500 italic mt-12">No orders found.</p>
      )}
    </div>
  );
}
