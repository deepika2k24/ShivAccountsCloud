// src/screens/ViewProducts.js
import React, { useEffect, useState } from "react";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [quantityMap, setQuantityMap] = useState({}); // Track quantity input per product
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      if (data.success) setProducts(data.products);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const handleQuantityChange = (productId, value) => {
    setQuantityMap({ ...quantityMap, [productId]: value });
  };

  const buyProduct = async (product) => {
    const qty = parseInt(quantityMap[product.id] || 1);
    if (!user || !user.id) {
      alert("Please log in to buy products");
      return;
    }
    if (qty <= 0) {
      alert("Enter a valid quantity");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          product_id: product.id,
          quantity: qty,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert(`Order placed successfully! Total: ₹${data.order.total_amount}`);
        fetchProducts(); // Refresh stock
      } else {
        alert(data.message || "Failed to place order");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto" }}>
      <h2>Available Products</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>HSN/SAC</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Available Qty</th>
            <th style={styles.th}>Buy Qty</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} style={styles.tr}>
              <td style={styles.td}>{p.product_name}</td>
              <td style={styles.td}>{p.product_id}</td>
              <td style={styles.td}>{p.category}</td>
              <td style={styles.td}>{p.hsn}</td>
              <td style={styles.td}>₹{p.sales_price}</td>
              <td style={styles.td}>{p.quantity}</td>
              <td style={styles.td}>
                <input
                  type="number"
                  min="1"
                  max={p.quantity}
                  value={quantityMap[p.id] || 1}
                  onChange={(e) => handleQuantityChange(p.id, e.target.value)}
                  style={{ width: "60px" }}
                />
              </td>
              <td style={styles.td}>
                <button onClick={() => buyProduct(p)} style={styles.button}>
                  Buy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  th: {
    border: "1px solid #ccc",
    padding: "8px",
    background: "#f4f4f4",
  },
  td: {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center",
  },
  tr: {
    transition: "background 0.2s",
  },
  button: {
    padding: "6px 12px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ViewProducts;
