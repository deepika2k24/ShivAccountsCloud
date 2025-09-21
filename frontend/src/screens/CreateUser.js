import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    role: "Invoicing User",
    loginId: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          role: formData.role,
          loginId: formData.loginId,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        setMessage("User created successfully!");
        setTimeout(() => navigate("/admin-dashboard"), 2000);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="Invoicing User">Invoicing User</option>
          <option value="Accountant">Accountant</option>
        </select>

        <input
          type="text"
          name="loginId"
          placeholder="Login ID"
          value={formData.loginId}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email ID"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <div style={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Re-enter Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <label style={styles.checkbox}>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          Show Password
        </label>

        <div style={styles.buttons}>
          <button type="submit" style={styles.createBtn}>
            Create
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin-dashboard")}
            style={styles.cancelBtn}
          >
            Cancel
          </button>
        </div>
      </form>

      {message && <div style={styles.popup}>{message}</div>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    background: "#fff",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  passwordWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  checkbox: {
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  createBtn: {
    background: "#28a745",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cancelBtn: {
    background: "#dc3545",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  popup: {
    marginTop: "20px",
    padding: "10px",
    background: "#d4edda",
    color: "#155724",
    borderRadius: "5px",
  },
};

export default CreateUser;
