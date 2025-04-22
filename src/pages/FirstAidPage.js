import React,{useState, useEffect} from "react";
import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";
import {db,ref,get} from "../utils/fireBase"
  
  const HomePage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [products,setProducts]=useState([])
    
    useEffect(() => {
     ( async () => {
          const data=await get(ref(db,'/firstAid'))
          setProducts(data.val())
      })()

    }, [])
    
        
    useEffect(() => {
      const filtered = products.filter((product) =>
        product.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }, [searchTerm,products]);
  
    const handleImageClick = (product) => {
      navigate("/product-details", { state: { product } });
    };
    return (
      <div className="home-container" style={{ padding: "20px" }}>
        <h1>Our Products</h1>
    
        {/* Image Banner with Search Bar Overlay */}
        <div style={{ position: "relative", marginBottom: "30px" }}>
          <img
            src="https://img.freepik.com/premium-photo/pills-medical-equiupments-light-blue-banner-background_8087-1348.jpg"
            alt="Product"
            style={{ width: "100%", height: "400px", borderRadius: "10px", objectFit: "cover" }}
          />
    
          
        </div>
    
        {/* Product Grid */}
        <div
          className="product-grid"
          style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}
        >
          {filteredProducts.map((product, index) => (
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