import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Shiv Furniture Admin 👑</p>

      <div style={styles.menu}>
        <Link to="/create-user" style={styles.card}>Create User</Link>
        <Link to="/sales-order" style={styles.card}>Sales Order</Link>
        <Link to="/sales-invoice" style={styles.card}>Sales Invoice</Link>
        <Link to="/receipt" style={styles.card}>Receipt</Link>
        <Link to="/add-products" style={styles.card}>Add Products</Link>
        <Link to="/admin-list-view" style={styles.card}>Admin List View</Link>
        
      </div>

      <h2>Master Data & Transactions</h2>
      <ul style={styles.list}>
        <li>➕ Add Users</li>
        <li>➕ Add Contacts (e.g., Azure Furniture, Nimesh Pathak)</li>
        <li>➕ Add Products (e.g., Wooden Chair, 5% tax)</li>
        <li>⚖️ Define Tax Rates (5%, 10%)</li>
        <li>📊 Setup Chart of Accounts</li>
        <li>🛒 Create Purchase Order → Vendor Bill → Payment</li>
        <li>💼 Create Sales Order → Invoice → Payment</li>
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif"
  },
  menu: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "20px",
    marginBottom: "40px"
  },
  card: {
    padding: "20px",
    backgroundColor: "#007bff",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "10px",
    minWidth: "150px",
    fontWeight: "bold",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
  },
  list: {
    textAlign: "left",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: "1.8",
    fontSize: "16px"
  }
};

export default AdminDashboard;
