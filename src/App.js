import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import FirstAidPage from "./pages/FirstAidPage";
import MedicinePage from "./pages/MedicinePage";
import OrderDetails from "./pages/OrderDetails";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./components/ProfilePage";
import AuthForm from "./components/AuthForm";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(""); // ✅ This line fixes the error
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("currentUser")
  );
  
  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/first-aid" element={<FirstAidPage />} />
        <Route path="/medicine" element={<MedicinePage />} />
        <Route path="/product-details" element={<OrderDetails />} />
        <Route path="/confirm-order" element={<OrderConfirmation />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<AuthForm />} />
        <Route path="/home" element={<HomePage />} />

        <Route path="/login" element={<AuthForm setIsLoggedIn={setIsLoggedIn} />} />
{/* 
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setUserEmail={setUserEmail}
            />
          }
        /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
