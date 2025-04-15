import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";

const AuthForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));
      if (
        registeredUser &&
        registeredUser.email === formData.email &&
        registeredUser.password === formData.password
      ) {
        localStorage.setItem("currentUser", JSON.stringify(registeredUser));
        setIsLoggedIn(true);
        navigate("/home");
      } else {
        alert("Invalid email or password");
      }
    } else {
      localStorage.setItem("registeredUser", JSON.stringify(formData));
      alert("Registration successful! Please login.");
      setIsLogin(true);
      setFormData({ firstName: "", email: "", password: "" });
    }
  };

  return (
    <>
    <div className="bg-setup">
    <div className="form-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="firstName"
            placeholder="Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>

      <p className="toggle-text">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Register here" : "Login here"}
        </span>
      </p>
    </div>
    </div>
    </>
  );
};

export default AuthForm;
