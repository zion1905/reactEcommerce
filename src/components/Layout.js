import React,{useEffect} from "react";
import { Outlet} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";



const Layout = ({isLoggedIn,setIsLoggedIn}) => {

  useEffect(() => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === 'true')
  })

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
