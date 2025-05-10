import React, { useState, useEffect } from "react";
import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";
import { db, ref, get } from "../utils/fireBase"

const HomePage = () => {
  const navigate = useNavigate();
  const searchTerm = ""
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([])
  useEffect(() => {
    get(ref(db, '/firstAid')).then((snapshot) => {
      const data = snapshot.val();
      setProducts(data);
    });
  }, []);
  


  useEffect(() => {
    const filtered = products.filter((product) =>
      product.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleImageClick = (product) => {
    navigate("/product-details", { state: { product } });
  };
  return (
    <div className="home-container">
      <h1>Our Products</h1>

      <div >
        <img
          src="https://img.freepik.com/premium-photo/pills-medical-equiupments-light-blue-banner-background_8087-1348.jpg"
          alt="Product"
          className="img"
        />


      </div>


      <div
        className="product-grid"
      >
        {filteredProducts.map((product, index) => (
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