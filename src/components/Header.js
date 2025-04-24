import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { useLocation } from "react-router-dom";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [isLoginPage,setIsLogInPage]=useState(false)


  useEffect(() => {
    setIsLogInPage(location.pathname.includes("login"))
  }, [location.pathname])
  

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userUid");
    setIsLoggedIn(false);
    navigate("/Home");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
          <div className="profile-menu-container">
            <img
              src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg"
              alt="Profile"
              className="profile-img"
              onClick={toggleMenu}
            />
            {menuOpen && (
              <div className="profile-dropdown">
                <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
                <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
                <Link to="/order-history" onClick={() => setMenuOpen(false)}>orderHistory</Link>

                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          !isLoginPage && (
            <button onClick={handleLoginClick}>Login</button>
          ) 
      )}
      </div>
    </header>
  );
};

export default Header;

