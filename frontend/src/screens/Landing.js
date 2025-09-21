import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Landing = () => {
  return (
    <div style={styles.container}>
      {/* Header with Logo */}
      <header style={styles.header}>
        <img src={logo} alt="Shiv Accounts Cloud" style={styles.logo} />
        <h1>Shiv Accounts Cloud</h1>
      </header>

      {/* Overview Section */}
      <section style={styles.overview}>
        <h2>Welcome to Shiv Accounts Cloud</h2>
        <p>
          A cloud-based accounting system for Shiv Furniture that enables:
        </p>
        <ul>
          <li>
            Entry of core master data (Contacts, Products, Taxes, Chart of
            Accounts).
          </li>
          <li>
            Smooth recording of sales, purchases, and payments using the master
            data.
          </li>
          <li>
            Automated generation of financial and stock reports like Balance
            Sheet, Profit & Loss (P&L), and Stock Statement.
          </li>
        </ul>
      </section>

      {/* Action Buttons */}
      <section style={styles.actions}>
        <Link to="/user-login" style={styles.button}>
          Login as User
        </Link>
        <Link to="/accountant-login" style={styles.button}>
          Login as Accountant
        </Link>
        <Link to="/admin-login" style={styles.adminButton}>
          Login as Admin
        </Link>
      </section>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "40px",
    background: "#f7f9fc",
    minHeight: "100vh",
  },
  header: {
    marginBottom: "40px",
  },
  logo: {
    height: "80px",
    marginBottom: "10px",
  },
  overview: {
    background: "#fff",
    padding: "30px",
    borderRadius: "8px",
    maxWidth: "700px",
    margin: "0 auto 40px auto",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  button: {
    padding: "12px 24px",
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#007bff",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  adminButton: {
    padding: "12px 24px",
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#28a745", // green color to differentiate
    borderRadius: "5px",
    fontWeight: "bold",
  },
};

export default Landing;