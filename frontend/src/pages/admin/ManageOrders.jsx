import React, { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { ChevronRight, ChevronDown } from 'lucide-react';

const mockOrders = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    countryCode: '+91',
    phoneNo: '9876543210',
    status: 'Pending',
    createdAt: '2025-05-23',
    artwork: {
      id: 101,
      title: 'Sunset Beauty',
      size: '24x36',
      surface: 'Canvas',
      medium: 'Oil',
      price: 4500,
      tags: 'nature,green,oil',
      description: 'A calm lakeside view',
      artistNote: 'Inspired by mornings in Kashmir',
      thumbnail: '/images/artwork1.jpg',
      availability: 'In Stock',
    },
  },
];

const ManageOrdersPage = () => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('name');
  const [statusFilter, setStatusFilter] = useState('');
  const [editingStatusId, setEditingStatusId] = useState(null);
  const [tempStatus, setTempStatus] = useState('');

  const toggleRow = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleStatusEdit = (orderId, currentStatus) => {
    setEditingStatusId(orderId);
    setTempStatus(currentStatus);
  };

  const handleStatusSave = (orderId) => {
    const index = mockOrders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      mockOrders[index].status = tempStatus;
    }
    setEditingStatusId(null);
  };

  const filteredOrders = mockOrders.filter(order => {
    const query = searchQuery.toLowerCase();
    const valueMap = {
      id: order.id.toString(),
      status: order.status,
      name: `${order.firstName} ${order.lastName}`,
      email: order.email,
      phone: order.phoneNo,
    };
    return (
      (!statusFilter || order.status === statusFilter) &&
      valueMap[searchField]?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold text-purple-700 mb-4">📦 Manage Orders</h1>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <select
          className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <div className="flex items-center bg-purple-50 rounded-md shadow-inner px-2 py-1">
          <select
            className="bg-transparent px-2 py-1 text-sm text-purple-700 focus:outline-none"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          >
            <option value="id">Order ID</option>
            <option value="status">Status</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
          <input
            type="text"
            placeholder={`Search by ${searchField}...`}
            className="bg-transparent px-2 py-1 w-full text-sm focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card className="overflow-x-auto border rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-purple-50 text-purple-700">
            <tr className="border-b border-purple-300">
              <th className="p-3 text-left"></th>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <React.Fragment key={order.id}>
                <tr className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <button onClick={() => toggleRow(order.id)}>
                      {expandedOrderId === order.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  </td>
                  <td className="p-3 font-bold text-black">#{order.id}</td>
                  <td className="p-3">{order.firstName} {order.lastName}</td>
                  <td className="p-3">{order.email}</td>
                  <td className="p-3">{order.countryCode} {order.phoneNo}</td>
                  <td className="p-3">
                    {editingStatusId === order.id ? (
                      <div className="flex gap-2 items-center">
                        <select
                          className="border rounded px-2 py-1 text-sm"
                          value={tempStatus}
                          onChange={(e) => setTempStatus(e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <Button size="sm" onClick={() => handleStatusSave(order.id)}>Save</Button>
                      </div>
                    ) : (
                      <div className="flex gap-2 items-center">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                          {order.status.toUpperCase()}
                        </span>
                        <Button size="sm" variant="outline" onClick={() => handleStatusEdit(order.id, order.status)}>Edit</Button>
                      </div>
                    )}
                  </td>
                </tr>
                {expandedOrderId === order.id && (
                  <tr className="bg-purple-50">
                    <td colSpan={6} className="p-6 text-sm text-gray-800">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <h3 className="font-semibold text-purple-600 mb-2">🎨 Artwork Info</h3>
                          <img
                            src={order.artwork.thumbnail}
                            alt={order.artwork.title}
                            className="w-32 h-32 object-cover rounded shadow mb-2"
                          />
                          <ul className="space-y-1">
                            <li><strong>Artwork ID:</strong> {order.artwork.id}</li>
                            <li><strong>Title:</strong> {order.artwork.title}</li>
                            <li><strong>Size:</strong> {order.artwork.size}</li>
                            <li><strong>Surface:</strong> {order.artwork.surface}</li>
                            <li><strong>Medium:</strong> {order.artwork.medium}</li>
                            <li><strong>Price:</strong> ₹{order.artwork.price}</li>
                            <li><strong>Tags:</strong> {order.artwork.tags}</li>
                            <li><strong>Description:</strong> {order.artwork.description}</li>
                            <li><strong>Artist Note:</strong> {order.artwork.artistNote}</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-purple-600 mb-2">👤 Customer Info</h3>
                          <ul className="space-y-1">
                            <li><strong>Name:</strong> {order.firstName} {order.lastName}</li>
                            <li><strong>Email:</strong> {order.email}</li>
                            <li><strong>Phone:</strong> {order.countryCode} {order.phoneNo}</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-purple-600 mb-2">📦 Order Info</h3>
                          <ul className="space-y-1">
                            <li><strong>Status:</strong> {order.status}</li>
                            <li><strong>Placed On:</strong> {order.createdAt}</li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ManageOrdersPage;
