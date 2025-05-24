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
    async function fetchData() {
      try {
        const data = await get(ref(db, '/home'));
        setProducts(data.val());
        setFilteredProducts(data.val());
  
        const responses = await Promise.all([
          get(ref(db, '/home')),
          get(ref(db, '/firstAid')),
          get(ref(db, '/medicine'))
        ]);
        
        const allData = responses.map(res => res.val());
        const combinedData = allData.flat();
        setAllProducts(combinedData);
      } catch (error) {
        console.log(error);
      }
    }
  
    fetchData();
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
    <div className="home-container">
     <div>
        <img
          src="https://png.pngtree.com/thumb_back/fh260/back_our/20190622/ourmid/pngtree-blue-minimalistic-flat-medical-health-banner-background-image_210029.jpg"
          alt="Product Banner"
         className="img"
        />

      
       <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
       className="searchBar"
          />
      </div>

      <div className="product-grid">
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