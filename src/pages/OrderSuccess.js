import React from "react";
import { useLocation } from "react-router-dom";

const OrderSuccess = () => {
  const { state } = useLocation();

  const { product, quantity, deliveryDetails, total } = state || {};

  // Generate a sample order ID using timestamp
  const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#0066cc", textAlign: "center", borderBottom: "2px solid #0066cc", paddingBottom: "10px" }}>
        Order Summary
      </h1>

      <div style={{ marginTop: "30px" }}>
        <h2 style={{ color: "#0066cc" }}>Product Details</h2>
        <p><strong>Product:</strong> {product?.product}</p>
        <p><strong>Price:</strong> {product?.price?.toFixed(2)}</p>
        <p><strong>Order ID:</strong> {orderId}</p>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2 style={{ color: "#0066cc" }}>Shipping Address</h2>
        <p><strong>Full Name:</strong> {deliveryDetails?.name}</p>
        <p><strong>Phone:</strong> {deliveryDetails?.phone}</p>
        <p><strong>Address:</strong> {deliveryDetails?.address}</p>
      </div>

      <div
        style={{
          marginTop: "40px",
          backgroundColor: "#e6f0ff",
          padding: "15px",
          textAlign: "center",
          fontWeight: "bold",
          borderRadius: "5px",
          color: "#333"
        }}
      >
        Your order will be delivered within 7 days.
      </div>
    </div>
  );
};

export default OrderSuccess;
