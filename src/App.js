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
import PaymentSuccess from "./pages/PaymentSuccess";
import ContactUs from "./pages/ContactUs";
import OrderHistory from "./pages/OrderHistory";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));
  
  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<HomePage />} />
   
        <Route path="/first-aid" element={<FirstAidPage />} />
        <Route path="/medicine" element={<MedicinePage />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/order-history" element={<OrderHistory/>}/>

        <Route path="/product-details" element={<OrderDetails />} />
        <Route path="/confirm-order" element={<OrderConfirmation />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<AuthForm />} />
        <Route path="/home" element={<HomePage />} />

        <Route path="/login" element={<AuthForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
