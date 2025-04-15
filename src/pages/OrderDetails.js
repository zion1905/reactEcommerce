// pages/OrderDetails.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../styles/OrderDetails.css';
// import { useParams } from "react-router-dom";


const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return <p style={{ padding: "20px" }}>No product found.</p>;
  }

  const handleBuyNow = () => {
    const userData = localStorage.getItem("currentUser");

    try {
      const user = JSON.parse(userData);
      if (user && user.email) {
        // Logged in user
        navigate("/confirm-order", { state: { product } });
      } else {
        throw new Error("Invalid user");
      }
    } catch (error) {
      alert("Please login to continue with your purchase.");
      navigate("/login");
    }
  };

  return (
    <div className="order-details-container">
      <h2>{product.product}</h2>
      <img
        src={product.image}
        alt={product.product}
        style={{ width: "300px", margin: "20px 0" }}
      />
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Size:</strong> {product.Size}</p>
      <p><strong>Rating:</strong> {product.Rating}</p>

      <button className="buy-button" onClick={handleBuyNow}>
        Buy Now
      </button>

      <button className="back-button" onClick={() => navigate(-1)}>
        Go Back
      </button>
      
    </div>
  );
};

export default OrderDetails;
