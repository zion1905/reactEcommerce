// pages/OrderConfirmation.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/OrderConfirmation.css";

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  const [quantity, setQuantity] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "zion",
    phone: "6380244180",
    address: "chennai",
    paymentMethod: "case on delivary",
  });

  //  Check login on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || !user.email) {
      alert("Please login to continue");
      navigate("/login");
    }
  }, [navigate]);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleConfirmOrder = () => {
    navigate("/order-success", {
      state: {
        product,
        quantity,
        deliveryDetails,
      total: product.price * quantity + 10,
     
      },
    });
  };

  if (!product) {
    return <p className="no-product">No product data found.</p>;
  }

  const productTotal = product.price * quantity;
  const deliveryFee = 10;
  const grandTotal = productTotal + deliveryFee;

  return (
    <div className="order-confirmation-container">
      <div className="order-summary-wrapper">
        {/* Left */}
        <div className="order-summary-left">
          <h2 className="section-title">Order Summary</h2>
          <div className="product-details">
            <img src={product.image} alt={product.product} className="product-image" />
            <div>
              <p className="product-name">{product.product}</p>
              <p className="product-price">₹{product.price.toFixed(2)} INR</p>
            </div>
            <div className="quantity-controller">
              <button onClick={() => handleQuantityChange(-1)} className="quantity-btn">-</button>
              <input type="text" value={quantity} readOnly className="quantity-input" />
              <button onClick={() => handleQuantityChange(1)} className="quantity-btn">+</button>
            </div>
            <p className="product-total">Total: ₹{productTotal.toFixed(2)} INR</p>
          </div>
        </div>


         {/* Right */}
        <div className="order-summary-box">
          <h2 className="section-title">Order Summary</h2>
          <div className="price-breakup">
            <p>Product Total <span className="float-right">{productTotal.toFixed(2)} INR</span></p>
            <p>Delivery Fee <span className="float-right">{deliveryFee} INR</span></p>
            <p><strong className="grand-label">Grand Total</strong> <span className="grand-total">{grandTotal.toFixed(2)} INR</span></p>
          </div>
          <button onClick={handleConfirmOrder} className="confirm-btn"> Confirm Order    </button>
       
       
        </div>
      </div>

      {/* Delivery */}
      
      <div className="delivery-details">
        <h2 className="section-title">Delivery Details</h2>
        <p><strong>Name</strong><br />
          <input name="name" value={deliveryDetails.name} onChange={handleInputChange} disabled={!isEditing} className="input-full" />
        </p>
        <p><strong>Phone Number</strong><br />
          <input name="phone" value={deliveryDetails.phone} onChange={handleInputChange} disabled={!isEditing} className="input-full" />
        </p>
        <p><strong>Address</strong><br />
          <input name="address" value={deliveryDetails.address} onChange={handleInputChange} disabled={!isEditing} className="input-full" />
        </p>
        <p><strong>Payment Method</strong><br />
          <input name="paymentMethod" value={deliveryDetails.paymentMethod} onChange={handleInputChange} disabled={!isEditing} className="input-full" />
        </p>
        <button onClick={handleEditToggle} className="edit-btn">{isEditing ? "Save" : "Edit"}</button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
