import React,{useState,useEffect} from "react";
// import ProductCard from "../components/ProductCard";
import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";
import {db,ref,get} from "../utils/fireBase"
   const HomePage = () => {
    const navigate = useNavigate();
      const [products,setProducts]=useState([])
        
        useEffect(() => {
         ( async () => {
              const data=await get(ref(db,'/medicine'))
              setProducts(data.val())
          })()
    
        }, [])
  
    const handleImageClick = (product) => {
      navigate("/product-details", { state: { product } });
    };
  
    return (
      <div className="home-container" style={{ padding: "20px" }}>
        <h1>Our Products</h1>
        <img
        src="https://img.pikbest.com/backgrounds/20190627/blue-pills-simple-medical-banner-background_1896626.jpg!sw800"
        alt="Product"
        style={{ width: "100%", height: "400px", borderRadius: "10px" }}
      />
        <div className="product-grid" style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {products.map((product, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "10px",
                width: "250px"
              }}
            >
              <img
                src={product.image}
                alt={product.product}
                style={{ width: "100%", cursor: "pointer" }}
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
