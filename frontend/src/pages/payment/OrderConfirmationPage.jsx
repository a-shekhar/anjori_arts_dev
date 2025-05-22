// src/pages/OrderConfirmedPage.jsx
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function OrderConfirmedPage({ orderId }) {
  return (
    <div className="min-h-screen bg-[#f1f2f6] flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-6 text-center">
        <CheckCircle className="text-green-600 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Order Confirmed!
        </h2>
        <p className="text-gray-600 mb-1">
          Thank you for your request. We've received your custom order.
        </p>
        <p className="text-sm text-gray-500">
          Order ID: <span className="font-medium text-gray-800">#{orderId}</span>
        </p>

        <div className="my-6 border-t pt-4 text-sm text-gray-600">
          🎨 Our artist will review your request and get in touch with you soon.
          You’ll be notified by email or phone.
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
          <Link
            to="/profile/orders"
            className="bg-[#3b0a45] text-white py-2 px-5 rounded-full font-medium hover:bg-[#52215f] transition"
          >
            Track Your Order
          </Link>
          <Link
            to="/"
            className="text-[#3b0a45] border border-[#3b0a45] py-2 px-5 rounded-full font-medium hover:bg-[#f3eaf7] transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
