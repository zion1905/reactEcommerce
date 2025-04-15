import React from "react";
import "../styles/HomePage.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.product} />
      <h3>{product.product}</h3>
      <p>{product.description.slice(0, 100)}...</p>
      <p>Price: ₹{product.price}</p>
      <p>Size: {product.Size}</p>
      <p>Rating: ⭐ {product.Rating}</p>
    </div>
  );
};

export default ProductCard;
