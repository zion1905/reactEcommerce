import React from "react";
// import ProductCard from "../components/ProductCard";
import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";

const products =[
    {
      "image": "https://images.apollo247.in/pub/media/catalog/product/a/m/amo0007.jpg?tr=q-80,f-webp,w-150,dpr-2,c-at_max",
      "product": "Amoxii-500 capsule",
      "description": "Amoxil-500 Capsule belongs to a group of anti-bacterial or antibiotics known as penicillin. Amoxil-500 Capsule is used to prevent and treat different types of bacterial infections like chest infections (pneumonia, bronchitis), ear/nose/throat (ENT) infections, urinary tract infections, skin infections, leg ulcers, gum ulcers, dental infections, and pressure sores. Besides this, it is also used with various antibiotics like clarithromycin to treat stomach ulcers caused by H. Pyroli bacteria.",
      "price":70 ,
      "currency": "INR",
      "Size": "500 mg",
      "Rating": 4.5
    },
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3AsFzgboR-EYlx-y7kF14zGOr9SHLvGyzUw&s",
      "product": "Cipro-500",
      "description": "Ciplox-500 Tablet is used to treat or prevent certain infections caused by bacteria. It is prescribed for the treatment of pneumonia, gonorrhoea (a sexually transmitted disease), typhoid fever (a serious infection that is common in developing countries), infectious diarrhoea (infections that cause severe diarrhoea), and infections of the skin, bone, joint, abdomen (stomach area), and prostate (male reproductive gland)",
      "price": 40,
      "currency": "INR",
      "Size": "500 mg",
      "Rating": 4.2
    },
    {
      "image": "https://images.apollo247.in/pub/media/catalog/product/a/z/azi0013_1.jpg?tr=q-80,f-webp,w-100,dpr-2,c-at_max",
      "product": "Azithral-500 Tablet",
      "description": "Azithral-500 Tablet is an antibiotic. It is used to treat various bacterial infections such as respiratory system (like pneumonia, bronchitis, tonsillitis, pharyngitis and sinusitis), skin infections (like acne and rosacea), ear infections, and sexually transmitted infections. A bacterial infection is a condition in which bacteria grow in the body and cause infection. It can target any body part and multiple very quickly.",
      "price": 118,
      "currency": "INR",
      "Size": "500 mg",
      "Rating": 4.3
    },
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxd7ktQaBYmewKJELboNx1gxCoORsct656yg&s",
      "product": "Calvam 625 Tablet",
      "description": "Clavam 625 Tablet is an antibiotic medicine used to treat bacterial infections of the ear, nose, throat, skin, bone, soft tissue, joints, urinary tract, and respiratory tract. A bacterial infection is a condition in which harmful bacteria infect our body. Infectious or harmful bacteria can make you sick and reproduce quickly in your body.Clavam 625 Tablet is a combination of Amoxicillin and Clavulanic acid. Amoxicillin works by preventing the formation of bacterial cell covering.",
      "price": 184,
      "currency": "INR",
      "Size": "1 mg",
      "Rating": 4.4
    },
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC0M54xYpiqiWipcbfCjT3J4Ws_kV9M8Y71A&s",
      "product": "Paracetamol ",
      "description":"Paracetamol is a medicine used to treat mild to moderate pain.Paracetamol can also be used to treat fever (high temperature).It's dangerous to take more than the recommended dose of paracetamol.Paracetamol overdose can damage your liver and cause death.Always follow the directions on the packet when using paracetamo",
      "price": 30,
      "currency": "INR",
      "Size": "500 mg",
      "Rating": 4.6
    },
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0R0GwyoRktyVP1y-WQOxuMdw48swvyF413g&s",
      "product": "Cetirizine",
      "description":"Cetirizine is an antihistamine used to relieve allergy symptoms such as watery eyes, runny nose, itching eyes/nose, sneezing, hives, and itching. It works by blocking a certain natural substance (histamine) that your body makes during an allergic reaction.Cetirizine does not prevent hives or prevent/treat a serious allergic reaction (such as anaphylaxis). If your doctor has prescribed epinephrine to treat allergic reactions, always carry your epinephrine injector with you. Do not use cetirizine in place of your epinephrine",
      "price": 15,
      "currency": "INR",
      "Size": "10 mg",
      "Rating": 4.6
    },
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT18FaaCSXOUuLdjcjVHyX8JZJF27YVcCCu_A&s",
      "product": "Headset Tablet",
      "description":"Headset tablet is used to treat headaches associated with migraines with or without warning signs. It is a combination medicine containing sumatriptan and naproxen. Sumatriptan works by narrowing the blood vessels in the brain, which helps in getting relief from migraine headaches. Naproxen works by reducing pain and swelling by decreasing the synthesis of a natural substance called prostaglandin, which is responsible for swelling and pain.",
      "price":137 ,
      "currency": "INR",
      "Size": "600 g",
      "Rating": 4.6
    },
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2yqAl5EHY5LidmOsmVn6u0rRKiYOxTyPWKA&s",
      "product": "Maxtra cold plus",
      "description":"Cheston Cold Tablet is a Tablet manufactured by Maxtra. It is commonly used for the diagnosis or treatment of Sneezing, itching, watery eyes, migraine, menstrual pain. It has some side effects such as Dry mouth, Fatigue, Blisters on skin, Restlessness.",
      "price": 15,
      "currency": "INR",
      "Size": "10 mg",
      "Rating": 4.6
    },
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK4E_7Jw3wqDq4p3d5_FewbrgA8-Kea4KleQ&s",
      "product": "Equate",
      "description":"Sleeping pills treat insomnia by making you feel drowsy and relaxed. Sleep aids, including natural ones like melatonin, can cause side effects.Although OTC sleep aids and supplements are easily accessible, you should check with your healthcare provider before taking them. Drugs in over-the-counter sleep aids (including supplements) can interfere with other medications or make health conditions worse.",
      "price": 200,
      "currency": "INR",
      "Size": "0.5 mg",
      "Rating": 4.6
    },
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYfbJjQ3SKFtCa0VkE-e7JhzO88CbJ06hY5Q&s",
      "product": "Vitamin B12",
      "description":"Our B12 supplement for Men stands out with its premium cobalamin formulation, providing a highly bio available source of vitamin B12 tablets for enhanced absorption and effectiveness.CAPSULES: Formulated as easy-to-swallow vegan capsules, our vitamin B12 supplements is suitable for individuals following vegan or plant-based diets, ensuring everyone can reap the benefits of this essential nutrient.",
      "price": 320,
      "currency": "INR",
      "Rating": 4.6
    },
    {
      "image": "https://static2.medplusmart.com/products/_8bb68f7_/EVIO0004_L.jpg",
      "product": "Evion",
      "description":"EVION 400MG CAPSULE is a vitamin supplement used to manage vitamin E deficiency. It contains tocopheryl acetate (Vitamin E) as an active ingredient. It helps protect the body against the damage caused by free radicals. It also helps in maintaining healthy skin, hair, and muscles.EVION 400MG CAPSULE may cause mild diarrhea or upset stomachs in some individuals. Consult your doctor if it troubles you.",
      "price": 30,
      "currency": "INR",
      "Size": "400 mg",
      "Rating": 4.6
    },
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhT6c2-poZUGhaMNChuP8Lr2ejhEznhJCl4A&s",
      "product": "Multivitamin Tablet",
      "description":"A multivitamin is a dietary supplement that includes vitamins, dietary minerals, and other nutritional ingredients and is meant to be taken as a supplement to a healthy diet. These drugs can be bought as tablets, capsules, pastilles, powders, liquids, or injectables. The Codex Alimentarius Commission (the United Nations body in charge of food standards) has recognized multivitamins as a food category, except for injectable forms, which can only be purchased and used under medical supervision.",
      "price": 500,
      "currency": "INR",
      "Size": "600 mg",
      "Rating": 4.6
    }
  ]
  
  
 const HomePage = () => {
    const navigate = useNavigate();
  
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
