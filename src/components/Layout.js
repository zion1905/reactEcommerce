// src/components/Layout.js
import React,{useEffect} from "react";
import { Outlet,useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";



const Layout = ({isLoggedIn,setIsLoggedIn}) => {

  const location = useLocation();
  useEffect(() => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") == 'true')
  }, [location.pathname])

  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
