import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const isLoggedIn = localStorage.getItem("isLoggedIn")==='true'
  const cartItems = JSON.parse(localStorage.getItem("cartItems"))||[]

  const existsInCart = cartItems.some(
    (item) => item.product.product === product.product
  );
 
  const handleBuyNow = () => {
    if (isLoggedIn) {  
      localStorage.setItem("isFromCartPage",false)    
      navigate("/confirm-order", { state: { product } });
    } else {
      alert("Please login to continue with your purchase.");
      navigate("/login");
    }
  };

  const handleCart = () => {
    if (isLoggedIn) {
      navigate("/confirm-cart", { state: { product } });
    } else {
      alert("Please login to continue with your purchase.");
      navigate("/login");
    }
  };

  const handleVisitCart = () => {
    navigate("/cart");
    
  };


  if (!product) {
    return <p style={{ padding: "20px" }}>No product found.</p>;
  }

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

      {existsInCart ? <button  style={{marginLeft:10}} className="buy-button" onClick={handleVisitCart}>
        Visit Cart
      </button> :
       <button  style={{marginLeft:10}} className="buy-button" onClick={handleCart}>
        Add to Cart
      </button>
      }

      <button className="back-button" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default ProductDetail;

