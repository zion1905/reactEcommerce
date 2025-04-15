import React,{useState, useEffect} from "react";
// import ProductCard from "../components/ProductCard";
import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";

const products = 
[
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgnnpR7Xkbo4HEDEmk3lWPhg_vepR67-eqcqlmRLaFQeVvyEmfl-TN_jf_xFUXTcXG7DU&usqp=CAU",
      "product": "First Aid Guide",
      "description": "First aid is the provision of initial care for an illness or injury. It is usually performed by a lay person to a sick or injured patient until definitive medical treatment can be accessed. Certain self-limiting illnesses or minor injuries may not require further medical care past the first aid intervention.",
      "price": 795,
      "Rating": 4.5,
      "currency": "INR"
    },
    {
      "image": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS0UKvWJm3AlaYT_r9j-CGI7FOR_3m_2XNLyJoAxyA1fg0tgbwd0fjcjFXVIL-xgRE-lb1FOqLtDl54doP19UQT6Alny4oIGJDhXBBD9lUAygpVbZMSsSuchQ&usqp=CAE",
      "product": "Crepe Bandage",
      "description": " Roller bandages are made from lightweight cotton, crepe or elasticised crepe, depending on the pressure to be achieved. A lightweight cotton bandage is used to hold a dressing in place, whereas a crepe or elasticised crepe bandage is used for applying support or firm pressure to a soft tissue injury.",
      "price": 199,
      "Rating": 4.2,
      "currency": "INR"
    },
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKwqveMWHntgoQRKCu8YnDlZYE9Pxqv7tlYg&s",
      "product": "Band Aid",
      "description": "Band-Aid Brand Adhesive Bandage Family Variety Pack in Assorted Sizes,  Skin your knee and you might need a couple of Band Aids! Figuratively, a Band Aid or bandaid is a quick, temporary fix for a larger problem: Telling people to change their passwords is just a Band Aid on a major data security issue!",
      "price": 3500,
      "Rating": 4.5,
      "currency": "INR"
    },
    {
      "image": "https://trucolour.com/cdn/shop/products/K-Tape_Images_Website_T_2048x.jpg?v=1683668025",
      "product": "Skin Tape",
      "description": "Skin tape is an innovative product featuring a revolutionary skin color-matching system These tapes usually have a hypoallergenic adhesive which is designed to hold firmly onto skin, dressing materials, and underlying layers of tape, but to remove easily without damaging the skin. They allow air to reach the skin.",
      "price": 180,
      "Rating": 4.4,
      "currency": "INR"
    },
    {
      "image": "https://images.apollo247.in/pub/media/catalog/product/D/C/DCG0024_1.jpg",
      "product": "Gauze Swabs",
      "description": "Gauze Swabs especially useful for dressing wounds where other fabrics might stick to the burn or laceration.Gauze swabs are typically made out of cotton. They are present in the majority of first aid kits. You may use gauze swabs to dress minor injuries: from wound dressing, mild cuts, grazes and abrasions to post surgery usage. You may use your swabs with a dressing or cream of some sort to cover a wound.",
      "price": 20,
      "Rating": 4.2,
      "currency": "INR"
    },
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvmR0i_ewQnR-7VcHcYYNTIJ3is1d8Aj8fXA&s",
      "product": "Dressing Pad",
      "description": " A dressing pad is a piece of material that's used to protect and promote healing of a wound What is a Wound Dressing? A wound dressing is a type of bandage that covers a wound by sticking to the surrounding skin using wound dressing tape or glue. Wound dressings can be gel (hydrogel), foam, gauze, bandage, or any other type of patch. They help prevent infection, encourage healing, and reduce pain.",
      "price": 30,
      "Rating": 4.5,
      "currency": "INR"
    },
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREaOhcWo2oi3KtCsdG1B-z0K3Sd84qpJ1gwQ&s",
      "product": " Alcohol Swabs",
      "description": "Alcohol swabs, also known as alcohol prep pads or alcohol wipes, are gauze pads soaked with alcohol. They are the go-to antiseptic wipes for cleaning a patch of skin prior to a needle puncture, injection, or minor pre-operation to prevent infections from bacteria. In some cases, it also offers relief from minor wounds.",
      "price": 50,
      "Rating": 4.3,
      "currency": "INR"
    },
    {
      "image": "https://images.meesho.com/images/products/392870828/bu1qw_512.webp",
      "product": "Gloves",
      "description": "A glove is a garment covering the hand, with separate sheaths or openings for each finger including the thumb. Gloves protect and comfort hands against cold or heat, damage by friction, abrasion or chemicals, and disease; or in turn to provide a guard for what a bare hand should not touch.",
      "price": 185,
      "Rating": 4.4,
      "currency": "INR"
    },
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRszuD6eUzzm5M7AkpNJzDTqiburdraF4XZ3g&s",
      "product": "Anti-Fungal Cream",
      "description": " Candid B Cream is a combination medicine. Antifungal creams are used to treat a variety of fungal skin infections. There are many different types of topical antifungals, both over-the-counter and prescription, that vary in their strength, mechanism of action, duration of treatment, and recommended uses.",
      "price": 250,
      "Rating": 4.5,
      "currency": "INR"
    },
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUCuSfk4oR33lNgYtEop81G5g2MytcN2P_Kw&s",
      "product": "Burns Cream",
      "description": "silver sulfadiazine  cream is used to prevent and treat wound infections in patients and killing the bacteria or preventing its growth, Burnheal Cream is a medicine used in the treatment of burns. It kills the infection-causing microorganisms, reduces inflammation symptoms such as burning sensation, irritation, and pain. This way it speeds up the healing process.",
      "price": 120,
      "Rating": 4.5,
      "currency": "INR"
    },
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4B_B_zubNcatYKV3aMGjr1__5JsUtMN2r5A&s",
      "product": "Thermometer",
      "description": " Thermometers are the most accurate thermometers, particularly for measuring body temperature. A thermometer is an instrument that measures temperature. It can measure the temperature of a solid such as food, a liquid such as water, or a gas such as air. The three most common units of measurement for temperature are Celsius, Fahrenheit, and kelvin",
      "price": 100,
      "Rating": 4.4,
      "currency": "INR"
    },
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQobXZS8iafLtW7i_gHh6RHqVI_DD2xd6ohA&s",
      "product": "povidone iodine liquid",
      "description": "Povidone-iodine is a topical antiseptic agent used for the treatment and prevention of infection in wounds. Povidone-iodine is a stable chemical complex of polyvinylpyrrolidone (povidone, PVP) and elemental iodine. It contains from 9.0% to 12.0% available iodine, calculated on a dry basis.It may be applied to the skin as a liquid, an ointment or a powder.",
      "price": 550,
      "Rating": 4.3,
      "currency": "INR"
    }
  ]
  
  
  const HomePage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products);
  
    useEffect(() => {
      const filtered = products.filter((product) =>
        product.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }, [searchTerm]);
  
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
    
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
            }}
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