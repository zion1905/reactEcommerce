// components/Header.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    localStorage.clear();

    navigate("/Home");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
     <header className="header">
          <div className="logo">   

            <Link to="/"> 🩺 MediStore</Link>
          </div>
    
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/first-aid">First Aid</Link>
            <Link to="/medicine">Medicine</Link>
            <Link to="/contactUs">Contact</Link>

          </nav>
    
          <div className="nav-auth">
            {isLoggedIn ? (
              <>
                <Link to="/profile">Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <button onClick={handleLoginClick}>Login</button>
            )}
          </div>
    
        </header>
  );
};

export default Header;

