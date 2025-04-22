// pages/PaymentSuccess.js
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/PaymentSuccess.css";

// const PaymentSuccess = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="payment-success-container">
//       <img
//         src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
//         alt="Success"
//         className="success-icon"
//       />
//       <h2>Thank you for ordering from our shop!</h2>
//       <p>Your order has been confirmed successfully.</p>
//       <div className="success-buttons">
//         <button onClick={() => navigate("/")}>Go to Home</button>
//         <button onClick={() => navigate("/order-success")}>View Order Status</button>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;


// import React, { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const PaymentSuccess = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigate("/order-success", { state });
//     }, 2000); // 2 seconds delay

//     return () => clearTimeout(timer);
//   }, [navigate, state]);

//   return (
//     <div>
//       <h2>Payment Successful!</h2>
//       <p>Redirecting to your order details...</p>
//     </div>
//   );
// };

// export default PaymentSuccess;


import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/PaymentSuccess.css";

const PaymentSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Save the order data to localStorage in case the user needs it again
    localStorage.setItem("orderData", JSON.stringify(state));

    // Automatically redirect to order success after 2 seconds
    const timer = setTimeout(() => {
      navigate("/order-success", { state });
    }, 5000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, [navigate, state]);

  return (
    <div className="payment-success-container">
      <img
        src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
        alt="Success"
        className="success-icon"
      />
      <h2>Thank you for ordering from our shop!</h2>
      <p>Your order has been confirmed successfully.</p>
      <div className="success-buttons">
        <button onClick={() => navigate("/")}>Go to Home</button>
        <button onClick={() => navigate("/order-success", { state })}>View Order Status</button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
