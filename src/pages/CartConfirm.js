import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/OrderConfirmation.css";

const CartConfimation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(state?.product || null);



  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };


  const handleConfirmOrder = () => {
    const orderData = {
      product,
      quantity
    };

    let orders=JSON.parse(localStorage.getItem("cartItems"))||[]
    orders.push(orderData)
    localStorage.setItem("cartItems", JSON.stringify(orders));
    navigate("/product-details", { state: state });
  };

  if (!product) return <p className="no-product">No product data found.</p>;


  return (
    <div style={{minHeight:'80vh'}} >
    <div className="order-confirmation-container">
      {/* Order Summary */}
      <div className="order-summary-wrapper">
        <div className="order-summary-left">
          <h2>Order Summary</h2>
          <div className="product-details">
            <img src={product.image} alt={product.product} className="product-image" />
            <div>
              <p>{product.product}</p>
              <p>₹{product.price.toFixed(2)} INR</p>
            </div>
            <div className="quantity-controller">
              <button onClick={() => handleQuantityChange(-1)} className="butn">-</button>
              <input type="text" value={quantity} readOnly />
              <button onClick={() => handleQuantityChange(1)} className="butn">+</button>
            </div>
          </div>
          <button onClick={handleConfirmOrder} className="confirm-btn">
            confirm
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CartConfimation;


