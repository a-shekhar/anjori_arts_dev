import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const mockOrders = Array.from({ length: 24 }).map((_, i) => ({
  id: `ORD-2025-${String(i + 1).padStart(4, "0")}`,
  buyer: {
    name: `Customer ${i + 1}`,
    phone: `98765000${i + 1}`,
    email: `user${i + 1}@example.com`,
  },
  artwork: {
    title: `Artwork ${i + 1}`,
    thumbnail: "https://placehold.co/100x100",
    price: 4500 + i * 10,
  },
  status: "Pending",
  placedAt: `2025-05-${(i % 30) + 1}`,
}));

const statusOptions = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
const searchOptions = ["Order ID", "Buyer Name", "Status"];

export default function ManageOrdersPage() {
  const [searchBy, setSearchBy] = useState("Order ID");
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState(mockOrders);
  const [expandedId, setExpandedId] = useState(null);
  const [page, setPage] = useState(1);

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

  const perPage = 12;
  const totalPages = Math.ceil(filteredOrders.length / perPage);
  const paginatedOrders = filteredOrders.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-4 md:p-6 space-y-6 font-sans">
        {/* Header */}
        <div className="rounded-xl bg-white border border-gray-200 p-4 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-800 font-heading flex items-center gap-2">
            🧾 Manage Orders
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <select
              className="border rounded-lg px-3 py-2 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              value={searchBy}
              onChange={(e) => {
                setPage(1);
                setSearchBy(e.target.value);
              }}
            >
              {searchOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <Input
              className="h-10 w-full sm:w-72"
              placeholder={`Search by ${searchBy}`}
              value={searchTerm}
              onChange={(e) => {
                setPage(1);
                setSearchTerm(e.target.value);
              }}
            />
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedOrders.map((order, index) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
            >
              {/* Card Header */}
              <div className="mb-4 border-b pb-2">
                <h2 className="text-md font-bold text-amber-600">
                  Order #{(page - 1) * perPage + index + 1} —{" "}
                  <span className="text-gray-700">{order.id}</span>
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center flex-wrap items-center gap-2 mt-8 text-sm">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </Button>

            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-1 rounded border text-sm ${
                    page === pageNum
                      ? "bg-teal-600 text-white border-teal-600"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        )}


        {filteredOrders.length === 0 && (
          <p className="text-center text-gray-500 italic mt-12">No orders found.</p>
        )}
      </div>
    </div>
  );
}
