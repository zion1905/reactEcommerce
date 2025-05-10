import React, { useEffect, useState } from "react";
import { db, ref, get, set, remove } from "../utils/fireBase";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/AdminPage.css";

const validationSchema = Yup.object().shape({
  product: Yup.string().required("Product name is required"),
  image: Yup.string().required("Image URL is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().positive("Must be positive").required("Price is required"),
  rating: Yup.number().min(0).max(5).required("Rating is required"),
  type: Yup.string().required("Category is required"),
});

const AdminPage = () => {
  const [products, setProducts] = useState({});
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const categories = ["home", "firstAid", "medicine"];
      const allProducts = {};
      for (let cat of categories) {
        const snapshot = await get(ref(db, `/${cat}`));
        if (snapshot.exists()) {
          allProducts[cat] = snapshot.val();
        }
      }
      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const categoryRef = ref(db, `/${values.type}`);
      const snapshot = await get(categoryRef);
      const existingProducts = snapshot.exists() ? snapshot.val() : {};

      const productData = {
        product: values.product,
        description: values.description,
        image: values.image,
        price: parseFloat(values.price),
        currency: "INR",
        rating: parseFloat(values.rating),
      };

      if (editingProduct) {
        // Update
        await set(ref(db, `/${values.type}/${editingProduct.index}`), productData);
        alert("Product updated successfully!");
        setEditingProduct(null);
      } else {
        // Add new
        const nextIndex = Object.keys(existingProducts).length;
        await set(ref(db, `/${values.type}/${nextIndex}`), productData);
        alert("Product added successfully!");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Please try again.");
    }
  };

  const handleEdit = (category, index, data) => {
    setEditingProduct({ category, index });
  };

  const handleDelete = async (category, index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await remove(ref(db, `/${category}/${index}`));
      alert("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  function capitalizeFirst(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }



  const initialValues = editingProduct
    ? {
      ...products[editingProduct.category][editingProduct.index],
      type: editingProduct.category,
    }
    : {
      product: "",
      image: "",
      description: "",
      price: "",
      rating: "",
      type: "",
    };

  return (
    <div>
      <div className="admin-form">
        <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Field name="product" placeholder="Product Name" />
              <ErrorMessage name="product" component="div" className="error" />

              <Field name="image" placeholder="Image URL" />
              <ErrorMessage name="image" component="div" className="error" />

              <Field as="textarea" name="description" placeholder="Description" />
              <ErrorMessage name="description" component="div" className="error" />

              <Field name="price" type="number" placeholder="Price" />
              <ErrorMessage name="price" component="div" className="error" />

              <Field name="rating" type="number" step="0.1" placeholder="Rating" />
              <ErrorMessage name="rating" component="div" className="error" />

              <Field as="select" name="type" disabled={!!editingProduct}>
                <option value="" disabled>-- Select Category --</option>
                <option value="home">Home</option>
                <option value="firstAid">First Aid</option>
                <option value="medicine">Medicine</option>
              </Field>
              <ErrorMessage name="type" component="div" className="error" />

              <button type="submit">
                {editingProduct ? "Update Product" : "Add Product"}
              </button>
              {editingProduct && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setEditingProduct(null)}
                
                >
                  Cancel
                </button>
              )}
            </Form>
          )}
        </Formik>

        <hr />
      </div>

      <h2>All Products</h2>
      {Object.entries(products).map(([category, items]) => (
        <div key={category}>
          <h3>{capitalizeFirst(category)}</h3>
          <div className="allProductsContainer">
            {Object.entries(items).map(([index, item]) => (
              <div key={`${category}-${index}`} className="productCard">
                <strong>{item.product}</strong>
                <p>₹{item.price}</p>
                <img src={item.image} alt={item.product} />
                <button onClick={() => handleEdit(category, index, item)}>Edit</button>
                <button className="cancel-btn" onClick={() => handleDelete(category, index)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminPage;
