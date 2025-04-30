import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/PaymentSuccess.css";

const PaymentSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("orderData", JSON.stringify(state));

    const timer = setTimeout(() => {
      navigate("/order-success", { state });
    }, 5000); 

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
