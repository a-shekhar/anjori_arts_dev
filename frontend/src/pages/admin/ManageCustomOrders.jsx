import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import CustomOrderSearchFilterDropdown from "../../components/dropdowns/CustomOrderSearchFilterDropdown";
import CustomOrderStatusDropdown from "../../components/dropdowns/CustomOrderStatusDropdown";

const statusOptions = ["New", "Reviewed", "Quoted", "In Progress", "Fulfilled", "Cancelled"];

const generateMockOrders = () =>
  Array.from({ length: 14 }).map((_, i) => ({
    id: `CUS-${1000 + i + 1}`,
    userId: `U${100 + i}`,
    name: `User ${i + 1}`,
    phone: `98765000${i}`,
    email: `user${i + 1}@example.com`,
    placedAt: `2025-05-${(i % 28 + 1).toString().padStart(2, "0")}`,
    status: statusOptions[i % statusOptions.length],
    suggestOptions: i % 2 === 0,
    images:
      i % 2 === 0
        ? [
            { id: 1, label: "Image A", url: "https://placehold.co/300x300" },
            { id: 2, label: "Image B", url: "https://placehold.co/300x300" },
          ]
        : [],
  }));

const fallbackImage = "https://placehold.co/300x300?text=No+Image";
const perPage = 9;

export default function ManageCustomOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchParams, setSearchParams] = useState({ searchBy: "Order ID", searchTerm: "" });

  const navigate = useNavigate();

  const fetchOrders = useCallback(() => {
    const all = generateMockOrders();
    const { searchBy, searchTerm } = searchParams;
    let filtered = all;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((order) => {
        if (searchBy === "Order ID") return order.id.toLowerCase().includes(term);
        if (searchBy === "Name") return order.name.toLowerCase().includes(term);
        if (searchBy === "Email") return order.email.toLowerCase().includes(term);
        if (searchBy === "Phone") return order.phone.toLowerCase().includes(term);
        if (searchBy === "Status") return order.status.toLowerCase().includes(term);
        return true;
      });
    }

    if (statusFilter) {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    const paginated = filtered.slice(currentPage * perPage, (currentPage + 1) * perPage);
    setOrders(paginated);
    setTotalPages(Math.ceil(filtered.length / perPage));

    sessionStorage.setItem(
      "manage-custom-orders-cache",
      JSON.stringify({
        orders: paginated,
        totalPages: Math.ceil(filtered.length / perPage),
        currentPage,
        searchParams,
        statusFilter,
      })
    );
  }, [currentPage, searchParams, statusFilter]);

  useEffect(() => {
    const cached = sessionStorage.getItem("manage-custom-orders-cache");
    if (cached) {
      const parsed = JSON.parse(cached);
      setOrders(parsed.orders || []);
      setTotalPages(parsed.totalPages || 0);
      setCurrentPage(parsed.currentPage || 0);
      setSearchParams(parsed.searchParams || { searchBy: "Order ID", searchTerm: "" });
      setStatusFilter(parsed.statusFilter || "");
    } else {
      fetchOrders();
    }
  }, []);

  const handleSearch = () => {
    setCurrentPage(0);
    fetchOrders();
  };

  const handleFilterChange = (searchBy, searchTerm) => {
    setSearchParams({ searchBy, searchTerm });
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          📦 Manage Custom Orders
        </h1>

        <div className="flex flex-col sm:flex-row flex-wrap items-end gap-3">
          <CustomOrderSearchFilterDropdown
            onChange={handleFilterChange}
            defaultSearchBy={searchParams.searchBy}
            defaultSearchTerm={searchParams.searchTerm}
            hideButton
          />

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 ml-1">Status</label>
            <CustomOrderStatusDropdown
              name="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
          </div>

          <Button
            className="h-10 px-6 bg-teal-600 hover:bg-teal-700 text-white text-sm"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => {
          const firstImage = order.images?.[0]?.url || fallbackImage;
          return (
            <div
              key={order.id}
              className="border rounded-xl shadow hover:shadow-md bg-white p-4 flex flex-col justify-between transition"
            >
              <img
                src={firstImage}
                alt="Order Preview"
                className="w-full h-48 object-cover rounded mb-3"
              />

              <div className="text-sm space-y-1">
                <p className="font-bold text-gray-800">🆔 {order.id}</p>
                <p className="text-gray-700">{order.name}</p>
                <p className="text-xs text-gray-500">📧 {order.email}</p>
                <p className="text-xs text-gray-500">📞 {order.phone}</p>
                <p className="text-sm font-medium text-teal-600">Status: {order.status}</p>

                {order.suggestOptions && (
                  <span className="inline-block mt-1 text-xs font-medium text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
                    🎯 Suggestion Required
                  </span>
                )}
              </div>

              <div className="mt-4 text-right">
                <Button
                  onClick={() => navigate(`/admin/custom-orders/${order.id}`, { state: { order } })}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4"
                >
                  View →
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {orders.length === 0 && (
        <p className="text-center text-gray-500 italic mt-4">No custom orders found.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
            disabled={currentPage === 0}
          >
            Prev
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={currentPage === i ? "default" : "outline"}
              onClick={() => setCurrentPage(i)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
