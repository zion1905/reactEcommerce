import React, { useState, useEffect } from "react";
import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";
import { db, ref, get } from "../utils/fireBase"
const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([])

  useEffect(() => {
    get(ref(db, '/medicine')).then((snapshot) => {
      setProducts(snapshot.val());
    });
  }, []);
  

  const handleImageClick = (product) => {
    navigate("/product-details", { state: { product } });
  };

  return (
    <div className="home-container" >
      <h1>Our Products</h1>
      <img
        src="https://img.pikbest.com/backgrounds/20190627/blue-pills-simple-medical-banner-background_1896626.jpg!sw800"
        alt="Product"
        className="img"
      />
      <div className="product-grid">
        {products.map((product, index) => (
          <div
            key={index}

          >
            <img
              src={product.image}
              alt={product.product}
              onClick={() => handleImageClick(product)}
            />
            <h3>{product.product}</h3>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
