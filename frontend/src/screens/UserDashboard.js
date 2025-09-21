// src/screens/UserDashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/user-login"); // redirect if not logged in
    return null;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome, {user.name || user.login_id}</h2>
      <p style={styles.subtitle}>Select an action below:</p>

      <div style={styles.grid}>
        <button style={styles.button} onClick={() => navigate("/view-products")}>
          View Products
        </button>
        <button style={styles.button} onClick={() => navigate("/purchase-order")}>
          Purchase Order
        </button>
        <button style={styles.button} onClick={() => navigate("/purchase-bill")}>
          Purchase Bill
        </button>
        <button style={styles.button} onClick={() => navigate("/purchase-history")}>
          Purchase History
        </button>
        <button style={styles.button} onClick={() => navigate("/payment")}>
          Payment
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "700px",
    margin: "50px auto",
    padding: "30px",
    textAlign: "center",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "10px",
  },
  subtitle: {
    marginBottom: "30px",
    color: "#555",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  button: {
    padding: "15px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    background: "#007bff",
    color: "#fff",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default UserDashboard;
