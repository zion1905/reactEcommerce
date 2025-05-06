import React, { useState , useEffect} from "react";
import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";
import {db,ref,get} from "../utils/fireBase"
const HomePage = () => {
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleImageClick = (product) => {
    navigate("/product-details", { state: { product } });
  };

   const [products,setProducts]=useState([])
   const [allProducts,setAllProducts]=useState([])
      
      useEffect(() => {
        (async () => {
          try {
            const data=await get(ref(db,'/home'))
            setProducts(data.val())   
            setFilteredProducts(data.val()); 

            const responses = await Promise.all([
              get(ref(db, '/home')),
              get(ref(db, '/firstAid')),
              get(ref(db, '/medicine'))
            ]);
            const dataArray = responses.map(res => res.val());
            const combinedArray = dataArray.flat();
            setAllProducts(combinedArray);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        })();
      }, []);
      
      useEffect(() => {
        if (searchTerm.trim() === "") {
          setFilteredProducts(products);
        } else {
          const matched = allProducts.filter((product) =>
            product.product.toLowerCase().includes(searchTerm.trim().toLowerCase())
          );
          setFilteredProducts(matched);
        }
      }, [searchTerm, allProducts,products]);
    return (
    <div className="home-container" style={{ padding: "20px" }}>
     <div style={{ position: "relative", marginBottom: "30px" }}>
        <img
          src="https://png.pngtree.com/thumb_back/fh260/back_our/20190622/ourmid/pngtree-blue-minimalistic-flat-medical-health-banner-background-image_210029.jpg"
          alt="Product Banner"
          style={{
            width: "100%",
            height: "400px",
            borderRadius: "10px",
            objectFit: "cover"
          }}
        />

      
       <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "12px 20px",
              width: "50%",
              maxWidth: "600px",
              borderRadius: "30px",
              border: "1px solid #ccc",
              fontSize: "16px",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              outline:"none"
            }}
          />
      </div>

      <div className="product-grid" style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
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