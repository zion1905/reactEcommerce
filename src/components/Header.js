import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Header.css";
import { getAuth, signOut } from "firebase/auth";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoginPage, setIsLogInPage] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const userEmail = localStorage.getItem("userEmail");
  const auth = getAuth();

  useEffect(() => {
    setIsLogInPage(location.pathname.includes("login"));
  }, [location.pathname]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userUid");
        setIsLoggedIn(false);
        navigate("/Home");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/">🩺 MediStore</Link>
        </div>

        <div className="hamburger" onClick={toggleSidebar}>
          &#9776;
        </div>

        <nav className="nav-links-desktop">
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
                onClick={toggleProfileDropdown}
              />
              {profileDropdownOpen && (
                <div className="profile-dropdown">
                  <Link to="/profile" onClick={() => setProfileDropdownOpen(false)}>Profile</Link>
                  <Link to="/cart" onClick={() => setProfileDropdownOpen(false)}>Cart</Link>
                  <Link to="/order-history" onClick={() => setProfileDropdownOpen(false)}>Order History</Link>
                  {userEmail === "zion@gmail.com" && (
                    <Link to="/admin" onClick={() => setProfileDropdownOpen(false)}>Admin</Link>
                  )}
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            !isLoginPage && <button onClick={() => navigate("/login")}>Login</button>
          )}
        </div>
      </header>

      {/* Sidebar Overlay */}
      <div className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`} onClick={closeSidebar}></div>

      {/* Sidebar Menu (No profile, cart, order history, admin, or logout) */}
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <button className="close-btn" onClick={closeSidebar}>×</button>
        <Link to="/" onClick={closeSidebar}>Home</Link>
        <Link to="/first-aid" onClick={closeSidebar}>First Aid</Link>
        <Link to="/medicine" onClick={closeSidebar}>Medicine</Link>
        <Link to="/contactUs" onClick={closeSidebar}>Contact</Link>
        {!isLoggedIn && !isLoginPage && (
          <button onClick={() => { closeSidebar(); navigate("/login"); }}>Login</button>
        )}
      </div>
    </>
  );
};

export default Header;
