// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import FirstAidPage from "./pages/FirstAidPage";
import MedicinePage from "./pages/MedicinePage";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./components/ProfilePage";
import AuthForm from "./components/AuthForm";
import PaymentSuccess from "./pages/PaymentSuccess";
import ContactUs from "./pages/ContactUs";
import OrderHistory from "./pages/OrderHistory";
import CartConfimation from "./pages/CartConfirm";
import Cart from "./pages/CartPage";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";
import ProductDetail from "./pages/ProductDetails";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") == 'true');
  
  

  return (
    <Router>
      <Routes>

        {/* Public Routes using shared Layout */}
        <Route element={<Layout setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}  />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/first-aid" element={<FirstAidPage />} />
          <Route path="/medicine" element={<MedicinePage />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/product-details" element={<ProductDetail />} />
        </Route>

        {/* Auth Route (Public) */}
        <Route path="/login" element={<AuthForm setIsLoggedIn={setIsLoggedIn} />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
          <Route element={<Layout setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} > 
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/confirm-order" element={<OrderConfirmation />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/confirm-cart" element={<CartConfimation />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
          </Route>
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </Router>
  );
}

export default App;
