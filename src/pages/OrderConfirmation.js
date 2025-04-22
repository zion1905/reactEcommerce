import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import "../styles/OrderConfirmation.css";

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [product, setProduct] = useState(state?.product || null);
  const [isEditing, setIsEditing] = useState(false);

  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    phone: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    
    const auth = getAuth();
    const db = getDatabase();
    const user = auth.currentUser;

    const userRef = ref(db, `users/${user.uid}`);
    get(userRef)
      .then((snapshot) => {
        console.log("DS");
        
        if (snapshot.exists()) {
          const userData = snapshot.val();
          console.log(userData);
          
          setDeliveryDetails((prev) => ({
            ...prev,
            name: userData.name || "",
            phone: userData.phone || "",
            address: userData.address || "",
          }));
        }
      })
      .catch((error) => {
        console.error("Failed to load user data", error);
      });
  }, []);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

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

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
  };

  const handleConfirmOrder = () => {
    const orderData = {
      product,
      quantity,
      deliveryDetails: {
        ...deliveryDetails,
        paymentMethod,
      },
      total: product.price * quantity + 10,
      time: new Date().getTime()
    };

    let orders=JSON.parse(localStorage.getItem("orderedItems"))||[]
    orders.push(orderData)
    localStorage.setItem("orderedItems", JSON.stringify(orders));
    navigate("/payment-success", { state: orderData });
  };

  if (!product) return <p className="no-product">No product data found.</p>;

  const productTotal = product.price * quantity;
  const deliveryFee = 10;
  const grandTotal = productTotal + deliveryFee;

  return (
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
            <p>Total: ₹{productTotal.toFixed(2)} INR</p>
          </div>
        </div>

        <div className="order-summary-box">
          <h2>Order Summary</h2>
          <p>Product Total: ₹{productTotal.toFixed(2)}</p>
          <p>Delivery Fee: ₹{deliveryFee}</p>
          <p><strong>Grand Total: ₹{grandTotal.toFixed(2)}</strong></p>

          <button onClick={handleConfirmOrder} className="confirm-btn">
            {paymentMethod === "Pay with Card" ? "Pay Now" : "Confirm Order"}
          </button>
        </div>
      </div>

      {/* Delivery Details */}
      <div className="delivery-details">
        <h2>Delivery Details</h2>

        <label>Name</label>
        <input
          name="name"
          value={deliveryDetails.name}
          onChange={handleInputChange}
          readOnly={!isEditing}
        />

        <label>Phone</label>
        <input
          name="phone"
          value={deliveryDetails.phone}
          onChange={handleInputChange}
          readOnly={!isEditing}
        />

        <label>Address</label>
        <input
          name="address"
          value={deliveryDetails.address}
          onChange={handleInputChange}
          readOnly={!isEditing}
        />

        <label>Payment Method</label>
        <div className="payment-options">
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
            alt="Cash on Delivery"
            onClick={() => handlePaymentSelect("Cash on Delivery")}
            className={`payment-method-image ${paymentMethod === "Cash on Delivery" ? "active" : ""}`}
          />
          <img
            src="https://akm-img-a-in.tosshub.com/businesstoday/images/story/202306/ezgif-sixteen_nine_197.jpg?size=948:533"
            alt="Pay with Card"
            onClick={() => handlePaymentSelect("Pay with Card")}
            className={`payment-method-image ${paymentMethod === "Pay with Card" ? "active" : ""}`}
          />
        </div>

        {paymentMethod === "Pay with Card" && (
          <div>
            <label>Card Number</label>
            <input
              name="cardNumber"
              value={deliveryDetails.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              readOnly={!isEditing}
            />
            <label>Expiry</label>
            <input
              name="expiry"
              value={deliveryDetails.expiry}
              onChange={handleInputChange}
              placeholder="MM/YY"
              readOnly={!isEditing}
            />
            <label>CVV</label>
            <input
              name="cvv"
              type="password"
              value={deliveryDetails.cvv}
              onChange={handleInputChange}
              placeholder="123"
              readOnly={!isEditing}
            />
          </div>
        )}

        <button onClick={handleEditToggle} className="edit-btn">
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;


