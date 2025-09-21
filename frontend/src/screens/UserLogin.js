import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [form, setForm] = useState({
    login_id: "",
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:5000/api/login-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login_id: form.login_id, password: form.password })
    });

    const data = await res.json();

    if (data.success) {
      // Save logged-in user
      localStorage.setItem("user", JSON.stringify(data.user));

      // Check if user already exists in database
      if (data.user.contactExists) {
        // Redirect to user dashboard if contact already exists
        navigate("/user-dashboard");
      } else {
        // Redirect to contact master if new user
        navigate("/contact-master");
      }
    } else {
      setError(data.message);
    }
  } catch (err) {
    console.error("Login error:", err);
    setError("Server error. Please try again later.");
  }
};


  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Login</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          name="login_id"
          placeholder="Login ID"
          value={form.login_id}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "80px auto",
    padding: "25px",
    background: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
    transition: "border 0.2s",
  },
  button: {
    padding: "12px",
    background: "#007bff",
    border: "none",
    borderRadius: "6px",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  buttonHover: {
    background: "#0056b3",
  },
  error: {
    color: "red",
    marginBottom: "10px",
    fontSize: "14px",
  },
};

export default UserLogin;
