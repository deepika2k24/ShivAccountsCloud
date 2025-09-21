import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
const ContactMaster = () => {
  const navigate = useNavigate(); // ✅ Add this
  const user = JSON.parse(localStorage.getItem("user"));  // 👈 add here

  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", state: "", postcode: "" });
  const [file, setFile] = useState(null);


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user || !user.id) {
    alert("User not found in localStorage. Please log in again.");
    return;
  }

  const formData = new FormData();
  for (let key in form) {
    formData.append(key, form[key]);
  }
  formData.append("user_id", user.id);
  if (file) formData.append("profilePic", file);

  try {
    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Server response:", data);

    if (data.success) {
      alert("Contact saved successfully!");
      setForm({ name: "", email: "", phone: "", city: "", state: "", postcode: "" });
      setFile(null);

      // Redirect depending on whether user already exists
      if (data.contactExists) {
        navigate("/user-dashboard");
      } else {
        navigate("/user-dashboard"); // Or you can have another page if needed
      }

    } else if (data.userExists) {
      // If backend says user already exists, redirect to dashboard
      alert("User already exists. Redirecting to dashboard.");
      navigate("/user-dashboard");
    } else {
      alert("Error: " + data.message);
    }
  } catch (err) {
    console.error("Request failed:", err);
    alert("Something went wrong. Check console for details.");
  }
};

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Contact Master</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input style={styles.input} name="name" placeholder="Contact Name" onChange={handleChange} required />
        <input style={styles.input} name="login_id" placeholder="Login ID" onChange={handleChange} required />
        <input style={styles.input} name="email" placeholder="Email" onChange={handleChange} required />
        <input style={styles.input} name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input style={styles.input} name="city" placeholder="City" onChange={handleChange} />
        <input style={styles.input} name="state" placeholder="State" onChange={handleChange} />
        <input style={styles.input} name="postcode" placeholder="Postcode" onChange={handleChange} />
        <input style={styles.input} type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button style={styles.button} type="submit">Save</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "30px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
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
    background: "#28a745",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default ContactMaster;
