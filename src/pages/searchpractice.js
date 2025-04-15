import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";


const products =[
   
    {
      "image": "https://d2t0svjwo1hj60.cloudfront.net/media/public/41775ed99c674ade8_nasmedK2edta.JPG",
      "product": "K2 Test TUBE",
      "description": "A K2 test tube, also known as an EDTA tube, is a blood collection tube that has a lavender-colored stopper and is coated with K2EDTA on the inside wall. The K2EDTA anticoagulant in the tube prevents blood from coagulating by binding to calcium ions. K2 test tubes are used in clinical laboratories for various tests, including whole blood analysis in haematology to determine erythrocytes, leukocytes, and thrombocytes, as well as in molecular diagnostics, for DNA extraction and genetic tests.",
      "price": 200,
      "currency": "INR",
      "Size": "3ml to 10ml",
      "Rating": 4.5
    },
    {
      "image": "https://d2t0svjwo1hj60.cloudfront.net/media/public/fca591ffa0334a018_Fluoride_2ml.jpeg",
      "product": "Sodium Furtoidec tube",
      "description": "In these 3ml vacuum tubes, sodium fluoride acts as an anticoagulant and prevents blood from clotting. Sodium Fluoride is used as an anticoagulant when blood is being tested for determining glucose levels. Even though sodium fluoride is a weak anticoagulant, it is used as a principle anticoagulant.Optimize glucose testing with Nasmed Sodium Fluoride Vacuum Blood Collection Tubes (NVSF3). This pack includes 100 tubes, meticulously designed to meet the highest standards in clinical diagnostics. With a 3ml capacity, these tubes are specifically crafted with sodium fluoride for accurate and reliable glucose analysis",
      "price": 290,
      "currency": "INR",
      "Size": "3ml",
      "Rating": 4.2
    },
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHU-KNu6MgtXW5fJ-0tdvIKWlDIZfsV1hCRA&s",
      "product": "Clot activator Vacuum",
      "description": "Vacusence Serum Clot Activator Tubes are used for clinical biochemistry and immunology.Clot Activator Technology: The included clot activator promotes rapid clotting, preserving the integrity of collected blood samples. Secure Seal Cap: Each tube features a secure seal cap to prevent leakage and maintain sample freshness during transport",
      "price": 260,
      "currency": "INR",
      "Size": "2ml to 6ml",
      "Rating": 4.3
    },
    {
      "image": "https://d2t0svjwo1hj60.cloudfront.net/media/public/1b1f03f1fc9b492eb_image.png",
      "product": "Lithium Heparin vacuum",
      "description": "NET Plasma Separating Tubes (PSTs) inner wall contains spray -dried sodium/ lithium heparin coating.The additives are anticoagulants, which block the coagulation of blood cells.Lithium heparin gel tubes contain gel  at the base which acts as plasma separator. Heparin activates antithrombins and acts as an anticoagulant. The gel forms a stable barrier between the plasma and the blood cells. After centrifugation the plasma sample is used for examination and improves plasma yield.Mixing recommendation: PSTs should be gently inverted 180º back and forth 8-10 times.Centrifugation instructions: 1300g for 10 minutes at 25º C room temperature.",
      "price": 400,
      "currency": "INR",
      "Size": "2ml to 5ml",
      "Rating": 4.4
    },
    {
      "image": "https://d2t0svjwo1hj60.cloudfront.net/media/public/f0898703f03e48f08_Urine_Container_50ml_Sterile3_1.JPG",
      "product": "Vacuum 50ml urine collection ",
      "description": "It is made of internally sterile polypropylene and has white graduation markings available on the outer surface. Urine containers with a 50ml capacity are essential for collecting, storing and transporting urine samples. These containers are specifically designed to maintain sample integrity and prevent contamination, ensuring accurate diagnostic testing and analysis.",
      "price": 250,
      "currency": "INR",
      "Size": "50ml",
      "Rating": 4.6
    },
    {
      "image": "https://d2t0svjwo1hj60.cloudfront.net/media/public/42b06eb4262c46fe9_image.png",
      "product": "Lumbo sacral",
      "description": "Scientifically designed product with flexible back splints, in order to provide comfortable support to the back and to allay low back pain.The spine is composed of 33 interlocking bones called vertebrae. The lumbosacral region of the spine consists of 5 lumbar vertebrae and the sacrum (5 bones joined together).",
      "price": 750,
      "currency": "INR",
      "Size": "Small to XXL",
      "Rating": 4.7
    },
    {
      "image": "https://d2t0svjwo1hj60.cloudfront.net/media/public/5e4a55539d7848d5b_image.png",
      "product": "Knee Supported Belt",
      "description": "A knee brace is a medical device that stabilizes your knee joint and holds it in place.Knee braces come in lots of types, shapes and sizes. They support your knee and take pressure off your joint. Visit a healthcare provider if you are feeling new or worsening knee pain. They wll diagnose what causing it and (if you need one) suggest the right type of brace.",
      "price": 640,
      "currency": "INR",
      "Size": "Universal",
      "Rating": 4.5
    },
    {
      "image": "https://d2t0svjwo1hj60.cloudfront.net/media/public/f69f523cbeac4d50a_image.png",
      "product": "Wrist and forearm Splint",
      "description": "Wrist & Forearm Splint is designed to provide firm support and pain relief for various wrist conditions, including sprains, strains, and minor fractures. Wrist and Forearm Splint Left Large, 1 Count is a high-quality orthopaedic device offering support and immobilisation for the wrist and forearm. It is especially suited for larger-sized wrists and forearms and is available in left-hand versions. This wrist and forearm splint is a versatile solution, ideal for conditions such as sprains, fractures, or for use in post-operative rehabilitation.",
      "price": 650,
      "currency": "INR",
      "Size": "Universal",
      "Rating": 4.6
    },
    {
      "image": "https://d2t0svjwo1hj60.cloudfront.net/media/public/cb3709ab08334a5bb_image.png",
      "product": "Arm belt",
      "description": "As a renowned name in the market, we have gained prominence providing superior solutions in rehabilitation products and present Shoulder Arm Pouch BeltShoulder Support Braces play a critical role in managing pain in the shoulder, promoting recovery, and preventing further injuries. By providing stabilization and support to the shoulder joint, they alleviate pain, enhance comfort, and aid in quicker recovery..",
      "price": 380,
      "currency": "INR",
      "Size": "Small to XL",
      "Rating": 4.3
    },
    {
      "image": "https://d2t0svjwo1hj60.cloudfront.net/media/public/093e69d28adc4972b_image.png",
      "product": "Metkit Ankle Binder Support",
      "description": "Ortho ankle binder helps support weak, sore, and injured ankles, heels, and feet.It is designed in way that gives overall support to ankles, heels and feet. Wearing this ankle binder is beneficial while going for a long run, gym activities, hiking, and cycling, keeping feet relaxed. An innovative design help recover from any ankle strains, sprains, fatigue and other discomforts.",
      "price": 285,
      "currency": "INR",
      "Size": "Universal",
      "Rating": 4.4
    },
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBP_Zay5lY-XT4j7rkU2eibmfPQWBZn0ZFkw&s",
      "product": "Shoulder belt",
      "description": "Shoulder belt (military), belt worn over the right shoulder, across the body. Bandolier, pocketed belt hold individual bullets or belts of ammunition. Sash, band worn around the waist or over the shoulder or hips and usually tied. Baldric, belt worn over one shoulder to carry a weapon or other implement.",
      "price": 485,
      "currency": "INR",
      "Size": "Small to XL",
      "Rating": 4.2
    },
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYHm2ekTrqVqmLuh9tdiVj7qM1vLsilPxaYA&s",
      "product": "Pregnancy relieving belt",
      "description": "LOWER YOUR BACK PRESSURE: This Adjustable Belly Band for Pregnancy can help to relieve pregnancy waist pressure, support the lower back and pelvis, correct posture, lift the abdomen without putting pressure on it and promote healthy baby growth. Belly belts help to evenly distribute your baby's weight across your abdomen and spine. This reduces pain by relieving pressure on the lower body's muscles, ligaments, joints, and back",
      "price": 1200,
      "currency": "INR",
      "Size": "Universal",
      "Rating": 4.8
    }
  ]
// const HomePage = () => {
//   const navigate = useNavigate();

//   const handleImageClick = (product) => {
//     navigate("/product-details", { state: { product } });
//   };
//   <div style={{ padding: "20px" }}>
//   <h1>Welcome to MediCare Mart!</h1>
//   <p>You have successfully logged in.</p>
// </div>

const HomePage = ({ products }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleImageClick = (product) => {
    navigate("/product-details", { state: { product } });
  };

  const handleSearch = () => {
    const foundProduct = products.find(
      (product) =>
        product.product.toLowerCase() === searchTerm.trim().toLowerCase()
    );

    if (foundProduct) {
      navigate("/product-details", { state: { product: foundProduct } });
    } else {
      alert("Product not found!");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
//     <div className="home-container" style={{ padding: "20px" }}>
//       <h1>Our Products</h1>
//       <img
//         src="https://png.pngtree.com/thumb_back/fh260/back_our/20190622/ourmid/pngtree-blue-minimalistic-flat-medical-health-banner-background-image_210029.jpg"
//         alt="Product"
//         style={{ width: "100%", height: "400px", borderRadius: "10px" }}
        
//       />    
//       <div>
//       <div>
//       </div>
//     </div>
//       <div className="product-grid" style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
//         {products.map((product, index) => (
//           <div
//             key={index}
//             style={{
//               border: "1px solid #ccc",
//               borderRadius: "10px",
//               padding: "10px",
//               width: "250px"
//             }}
//           >
//             <img
//               src={product.image}
//               alt={product.product}
//               style={{ width: "100%", cursor: "pointer" }}
//               onClick={() => handleImageClick(product)}
//             />
//             <h3>{product.product}</h3>
//             <p>₹{product.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

<div className="home-container" style={{ padding: "20px" }}>
<h1>Welcome to MediCare Mart!</h1>
<p>You have successfully logged in.</p>

{/* Banner image with search bar */}
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

  {/* Search Bar Positioned on Image */}
  <div style={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "10px 20px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  }}>
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={handleKeyPress}
      style={{
        padding: "8px 12px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        width: "250px"
      }}
    />
    <button
      onClick={handleSearch}
      style={{
        padding: "8px 16px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
      }}
    >
      Search
    </button>
  </div>
</div>

{/* Products Grid */}
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
