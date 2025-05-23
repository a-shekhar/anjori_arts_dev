import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon, SearchIcon } from 'lucide-react';
import OrderStatusDropdown from '../../components/dropdowns/OrderStatusDropdown';
import ImageThumbnailList from '../../components/dropdowns/ImageThumbnailList';

const dummyOrders = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    country_code: '+91',
    phone_no: 9876543210,
    art_type: 'Portrait',
    surface: 'Canvas',
    medium: 'Oil',
    budget: '₹5000',
    preferred_size: '12x16',
    no_of_copies: '1',
    additional_notes: 'Please use bright colors.',
    suggest_options: true,
    quoted_price: 5500.0,
    agreed_price: 5300.0,
    status: 'PENDING',
    created_at: '2025-05-10T12:00:00Z',
    imageUrls: [
      'https://via.placeholder.com/100x100?text=Image+1',
      'https://via.placeholder.com/100x100?text=Image+2',
    ],
  },
];

export default function ManageCustomOrdersPage() {
  const [orders, setOrders] = useState(dummyOrders);
  const [search, setSearch] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [searchField, setSearchField] = useState('name');

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleQuotedPriceChange = (orderId, newPrice) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, quoted_price: newPrice } : order
      )
    );
  };

  const handleAgreedPriceChange = (orderId, newPrice) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, agreed_price: newPrice } : order
      )
    );
  };

  const filteredOrders = orders.filter(order => {
    const fullName = `${order.first_name} ${order.last_name}`.toLowerCase();
    if (searchField === 'name') return fullName.includes(search.toLowerCase());
    if (searchField === 'email') return order.email.toLowerCase().includes(search.toLowerCase());
    if (searchField === 'art_type') return order.art_type.toLowerCase().includes(search.toLowerCase());
    return true;
  });

  return (
    <div className="p-4 max-w-7xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">🎨 Manage Custom Orders</h1>

      <div className="mb-6 flex items-center gap-2 bg-purple-50 p-2 rounded-xl shadow-sm">
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          className="px-3 py-2 rounded border border-purple-300 text-purple-700 font-medium text-sm focus:outline-none"
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="art_type">Art Type</option>
        </select>
        <div className="flex items-center w-full">
          <span className="text-gray-400 px-2">
            <SearchIcon size={16} />
          </span>
          <input
            type="text"
            placeholder={`Search by ${searchField.replace('_', ' ')}...`}
            className="w-full bg-transparent p-2 focus:outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-6 bg-purple-50 text-sm font-semibold text-purple-800 px-4 py-3 border-b">
          <div></div>
          <div>Order ID</div>
          <div>Name</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Status</div>
        </div>

        {filteredOrders.map(order => {
          const isExpanded = expandedOrderId === order.id;
          return (
            <div key={order.id} className="border-b">
              <div
                className="grid grid-cols-6 items-center px-4 py-3 hover:bg-gray-50 cursor-pointer"
                onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
              >
                <div>{isExpanded ? <ChevronDownIcon size={18} /> : <ChevronRightIcon size={18} />}</div>
                <div className="font-mono">#{order.id}</div>
                <div>{order.first_name} {order.last_name}</div>
                <div>{order.email}</div>
                <div>{order.country_code} {order.phone_no}</div>
                <div><span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">{order.status}</span></div>
              </div>

              {isExpanded && (
                <div className="bg-white px-6 py-6 text-sm space-y-6">
                  <div>
                    <h3 className="text-purple-600 font-semibold mb-2">📦 Order Info</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><label className="text-gray-600">Art Type</label><div>{order.art_type}</div></div>
                      <div><label className="text-gray-600">Surface</label><div>{order.surface}</div></div>
                      <div><label className="text-gray-600">Medium</label><div>{order.medium}</div></div>
                      <div><label className="text-gray-600">Budget</label><div>{order.budget}</div></div>
                      <div><label className="text-gray-600">Preferred Size</label><div>{order.preferred_size}</div></div>
                      <div><label className="text-gray-600">No. of Copies</label><div>{order.no_of_copies}</div></div>
                      <div><label className="text-gray-600">Suggest Options</label><div>{order.suggest_options ? 'Yes' : 'No'}</div></div>
                    </div>
                    {order.additional_notes && <div className="mt-3 italic text-gray-600">📝 {order.additional_notes}</div>}
                  </div>

                  <div>
                    <h3 className="text-purple-600 font-semibold mb-2">🖼️ Uploaded Images</h3>
                    <ImageThumbnailList images={order.imageUrls} />
                  </div>

                  <div>
                    <h3 className="text-purple-600 font-semibold mb-2">🛠️ Admin Controls</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Quoted Price</label>
                        <input
                          type="number"
                          className="w-full border px-3 py-2 rounded-lg"
                          value={order.quoted_price}
                          onChange={(e) => handleQuotedPriceChange(order.id, parseFloat(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Agreed Price</label>
                        <input
                          type="number"
                          className="w-full border px-3 py-2 rounded-lg"
                          value={order.agreed_price}
                          onChange={(e) => handleAgreedPriceChange(order.id, parseFloat(e.target.value))}
                        />
                      </div>
                    </div>

                    <label className="block text-sm font-medium mt-4 mb-1">Change Status</label>
                    <OrderStatusDropdown
                      currentStatus={order.status}
                      onChange={(newStatus) => handleStatusChange(order.id, newStatus)}
                    />

                    <label className="block text-sm font-medium mt-4 mb-1">Admin Note</label>
                    <textarea
                      rows={3}
                      className="w-full border p-3 rounded-lg text-sm"
                      placeholder="Write a note to send to the user or keep as admin-only info..."
                    />

                    <div className="mt-4 flex gap-3">
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700">
                        ✉️ Send Email
                      </button>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">
                        💾 Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}