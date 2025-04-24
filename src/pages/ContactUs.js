import React, { useState } from "react";
import emailjs from "emailjs-com";
import "../styles/ContactUs.css"; 

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { name, email } = formData;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const namePattern = /^[a-zA-Z0-9]+$/;

    if (!name || name.length < 3 || !namePattern.test(name)) {
      alert("Please enter a valid name. Only alphanumeric characters are allowed, and no spaces.");
      return false;
    }

    if (!email || !emailPattern.test(email) || email.includes(" ")) {
      alert("Please enter a valid email address. No spaces allowed.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const templateParams = {
      from_name: formData.name,
      email: formData.email,
      message: formData.message
    };

    emailjs.send('service_oi8lk5a', 'template_ccxaxrh', templateParams, 'gz2kgb4olL8yp486e')
      .then(response => {
        console.log("SUCCESS!", response.status, response.text);
        alert("Sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(error => {
        console.error("FAILED...", error);
        alert("Something went wrong. Please try again.");
      });
  };

  const handleBackHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="container">
      <h1 className="contact-header">Contact Us</h1>

      <section className="contact-info">
        <div className="info-box">
          <h3>Phone</h3>
          <p>+91 9876543210</p>
        </div>
      </section>

      <section className="contact-form">
        <h2>Send Us a Message</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn">Submit</button>
        </form>
      </section>

      <button type="button" id="Home" onClick={handleBackHome}>Back To Home</button>
    </div>
  );
};

export default ContactUs;
