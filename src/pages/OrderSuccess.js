import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/OrderSuccess.css";

const OrderSuccess = () => {
  const { state } = useLocation();

  if (!state) return <p>No order found.</p>;

  const { product, quantity, deliveryDetails, total } = state;

  return (
    <>
    <div className="order-success-container">
      <h2>🎉 Order Confirmed!</h2>
      <p><strong>Product:</strong> {product.product}</p>
      <p><strong>Quantity:</strong> {quantity}</p>
      <p><strong>Total:</strong> ₹{total}</p>
      <h3>Shipping Info:</h3>
      <p><strong>Name:</strong> {deliveryDetails.name}</p>
      <p><strong>Address:</strong> {deliveryDetails.address}</p>
      <p><strong>Phone:</strong> {deliveryDetails.phone}</p>
      <p><strong>Payment Method:</strong> {deliveryDetails.paymentMethod}</p>
      <h4><strong> Your order will be delivered within 3 days.
      </strong></h4>
    </div>
   
    </>
  );
};

export default OrderSuccess;


