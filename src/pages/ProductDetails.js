import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [quantity] = useState(1);

  const cartItems = useMemo(() => {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  }, []);

  const [existsInCart, setExistsInCart] = useState(false);

  useEffect(() => {
    const exists = cartItems.some(
      (item) => item.product.product === product.product
    );
    setExistsInCart(exists);
  }, [product, cartItems]);



  const handleBuyNow = () => {
    if (!isLoggedIn) {
      alert("Please login to continue with your purchase.");
      navigate("/login");
      return;
    }

    localStorage.setItem("isFromCartPage", false);
    navigate("/confirm-order", { state: { product, quantity } });
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert("Please login to add to cart.");
      navigate("/login");
      return;
    }

    const newItem = { product, quantity };
    const updatedCart = [...cartItems, newItem];
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setExistsInCart(true)
    alert("Added to cart successfully!");

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
      <img src={product.image} alt={product.product} />

      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>
      {!!product.size &&
        <p><strong>Size:</strong> {product.size}</p>
      }
      <p><strong>Rating:</strong> {product.rating}</p>


      <div className="button-group">
        <button className="buy-button" onClick={handleBuyNow}>Buy Now</button>
        {existsInCart ? (
          <button className="secondary-button" onClick={handleVisitCart}>Visit Cart</button>
        ) : (
          <button className="secondary-button" onClick={handleAddToCart}>Add to Cart</button>
        )}
      </div>

      <button className="back-button" onClick={() => navigate(-1)}>← Go Back</button>
    </div>
  );
};

export default ProductDetail;
