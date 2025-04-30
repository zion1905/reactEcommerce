import React, { useState } from "react";
import { db, ref, get, set } from "../utils/fireBase"; // Removed push(), added get and set
import "../styles/AdminPage.css";

const AdminPage = () => {
  const [formData, setFormData] = useState({
    product: "",
    image: "",
    description: "",
    price: "",
    rating: "",
    type: "home", // default category
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const categoryRef = ref(db, `/${formData.type}`);

      // Get current product list to calculate next index
      const snapshot = await get(categoryRef);
      const existingProducts = snapshot.exists() ? snapshot.val() : {};
      const nextIndex = Object.keys(existingProducts).length;

      const productData = {
        product: formData.product,
        description: formData.description,
        image: formData.image,
        price: parseFloat(formData.price),
        currency: "INR",
        rating: parseFloat(formData.rating),
      };

      // Set the product using index key
      await set(ref(db, `/${formData.type}/${nextIndex}`), productData);

      alert("✅ Product added successfully!");

      // Reset form
      setFormData({
        product: "",
        image: "",
        description: "",
        price: "",
        rating: "",
        type: "home",
      });
    } catch (error) {
      console.error("❌ Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="admin-form" style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="product"
          value={formData.product}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          required
        />
        <input
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating"
          type="number"
          step="0.1"
          required
        />
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="home">Home</option>
          <option value="firstAid">First Aid</option>
          <option value="medicine">Medicine</option>
        </select>
        <button type="submit" style={{ marginTop: "10px" }}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
