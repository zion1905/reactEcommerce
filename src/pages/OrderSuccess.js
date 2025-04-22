// import React from "react";
// import { useLocation } from "react-router-dom";

// const OrderSuccess = () => {
//   const { state } = useLocation();

//   const { product,  deliveryDetails,  } = state || {};

//   // Generate a sample order ID using timestamp
//   const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

//   return (
//     <div style={{ padding: "40px", fontFamily: "Arial, sans-serif", placeContent:'center', height:'73dvh' }}>
//       <h1 style={{ color: "#0066cc", textAlign: "center", borderBottom: "2px solid #0066cc", paddingBottom: "10px" }}>
//         Order Summary
//       </h1>

//       <div style={{ marginTop: "30px" }}>
//         <h2 style={{ color: "#0066cc" }}>Product Details</h2>
//         <p><strong>Product:</strong> {product?.product}</p>
//         <p><strong>Price:</strong> {product?.price?.toFixed(2)}</p>
//         <p><strong>Order ID:</strong> {orderId}</p>
//       </div>

//       <div style={{ marginTop: "30px" }}>
//         <h2 style={{ color: "#0066cc" }}>Shipping Address</h2>
//         <p><strong>Full Name:</strong> {deliveryDetails?.name}</p>
//         <p><strong>Phone:</strong> {deliveryDetails?.phone}</p>
//         <p><strong>Address:</strong> {deliveryDetails?.address}</p>
//       </div>

//       <div
//         style={{
//           marginTop: "40px",
//           backgroundColor: "#e6f0ff",
//           padding: "15px",
//           textAlign: "center",
//           fontWeight: "bold",
//           borderRadius: "5px",
//           color: "#333"
//         }}
//       >
//         Your order will be delivered within 7 days.
//       </div>
//     </div>
//   );
// };

// export default OrderSuccess;

// import React from "react";
// import { useLocation } from "react-router-dom";

// const OrderSuccess = () => {
//   const { state } = useLocation();

//   if (!state) return <p>No order found.</p>;

//   const { product, quantity, deliveryDetails, total } = state;

//   return (
//     <div>
//       <h2>🎉 Order Confirmed!</h2>
//       <p><strong>Product:</strong> {product.product}</p>
//       <p><strong>Quantity:</strong> {quantity}</p>
//       <p><strong>Total:</strong> ₹{total}</p>
//       <h3>Shipping Info:</h3>
//       <p><strong>Name:</strong> {deliveryDetails.name}</p>
//       <p><strong>Address:</strong> {deliveryDetails.address}</p>
//       <p><strong>Phone:</strong> {deliveryDetails.phone}</p>
//       <p><strong>Payment Method:</strong> {deliveryDetails.paymentMethod}</p>
//     </div>
//   );
// };

// export default OrderSuccess;

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
      <h4><strong> Your order will be delivered within 7 days.
      </strong></h4>
    </div>
   
    </>
  );
};

export default OrderSuccess;


