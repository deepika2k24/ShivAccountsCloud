
// src/screens/AddProduct.js
import React, { useState } from "react";

const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productName: "",
    productId: "",
    quantity: "",
    category: "",
    hsn: "",
  });
  const [hsnSuggestions, setHsnSuggestions] = useState([]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    
    // If typing in HSN field, fetch suggestions
    if (e.target.name === "hsn") fetchHsnSuggestions(e.target.value);
  };

  // Fetch HSN suggestions
  const fetchHsnSuggestions = async (inputText) => {
    if (!inputText) {
      setHsnSuggestions([]);
      return;
    }
    try {
      const res = await fetch(
        `https://services.gst.gov.in/commonservices/hsn/search/qsearch?inputText=${inputText}&selectedType=byDesc&category=P`
      );
      const data = await res.json();
      if (data.data) setHsnSuggestions(data.data);
    } catch (err) {
      console.error("HSN fetch error:", err);
    }
  };

  // Add product to list
  const addProduct = () => {
    setProducts([...products, form]);
    setForm({ productName: "", productId: "", quantity: "", category: "", hsn: "" });
    setHsnSuggestions([]);
  };

  // Remove product
  const removeProduct = (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "50px auto" }}>
      <h2>Add Products</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input name="productName" placeholder="Product Name" value={form.productName} onChange={handleChange} />
        <input name="productId" placeholder="Product ID" value={form.productId} onChange={handleChange} />
        <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <input name="hsn" placeholder="sales tax" value={form.hsn} onChange={handleChange} />
        <input name="hsn" placeholder="sales price" value={form.hsn} onChange={handleChange} />
        <input name="hsn" placeholder="purchase price" value={form.hsn} onChange={handleChange} />
        <input name="hsn" placeholder="purchase tax" value={form.hsn} onChange={handleChange} />
        <input name="hsn" placeholder="taxname" value={form.hsn} onChange={handleChange} />
        <input name="hsn" placeholder="taxvalue" value={form.hsn} onChange={handleChange} />
        {hsnSuggestions.length > 0 && (
          <ul style={{ border: "1px solid #ccc", padding: "5px" }}>
            {hsnSuggestions.map((item) => (
              <li
                key={item.c}
                onClick={() => setForm({ ...form, hsn: item.c })}
                style={{ cursor: "pointer" }}
              >
                {item.c} - {item.n}
              </li>
            ))}
          </ul>
        )}
        <button onClick={addProduct}>Add Product</button>
      </div>

      <h3>Products List</h3>
      <ul>
        {products.map((p, index) => (
          <li key={index}>
            {p.productName} ({p.productId}) - {p.quantity} - {p.category} - {p.hsn}{" "}
            <button onClick={() => removeProduct(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddProduct;
