import { useLocation, Navigate } from "react-router-dom";
import OrderConfirmedPage from "./OrderConfirmationPage";

export default function OrderConfirmedPageWrapper() {
  const location = useLocation();
  const { orderId } = location.state || {};

  if (!orderId) {
    return <Navigate to="/" />;
  }

  return <OrderConfirmedPage orderId={orderId} />;
}
