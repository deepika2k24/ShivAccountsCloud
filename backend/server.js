import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import fs from "fs";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve images

// Postgres pool
const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "shivaccountscloud",
  password: "deepu123", // change if needed
  port: 5432,
});

// Test DB connection
pool.query("SELECT NOW()")
  .then(res => console.log("DB connected:", res.rows[0]))
  .catch(err => console.error("DB error:", err));

// File upload (profile pics)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ------------------------------------------------------------
// User Registration (for testing, admin can add users)
app.post("/api/users", async (req, res) => {
  try {
    const { name, role, loginId, email, password } = req.body;
    const hashedPw = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (name, role, login_id, email, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, role, login_id, email;
    `;
    const values = [name, role, loginId, email, hashedPw];
    const result = await pool.query(query, values);

    res.status(201).json({ message: "User created", user: result.rows[0] });
  } catch (err) {
    console.error(err);
    if (err.code === "23505") {
      res.status(400).json({ message: "Login ID or Email exists" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
});

// User Login (only Invoicing User role allowed)
// User Login (only Invoicing User role allowed)
app.post("/api/login-user", async (req, res) => {
  const { login_id, password } = req.body; // Only what we need
  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE role='Invoicing User' AND login_id=$1;`,
      [login_id]
    );

    if (result.rows.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const user = result.rows[0];

    // Compare password
    const validPw = await bcrypt.compare(password, user.password);
    if (!validPw) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong password" });
    }

    // Remove password before sending to frontend
    const { password: pw, ...userWithoutPassword } = user;

    res.json({ success: true, user: userWithoutPassword });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// Contact Master - add contact
app.post("/api/contact", upload.single("profilePic"), async (req, res) => {
  const { name, email, phone, city, state, postcode, user_id } = req.body;
  const profilePic = req.file ? req.file.filename : null;

  try {
    // Get the login_id of the user
    const userRes = await pool.query("SELECT login_id FROM users WHERE id=$1;", [user_id]);
    const login_id = userRes.rows[0]?.login_id || null;

    const query = `
      INSERT INTO contacts (user_id, login_id, name, email, phone, city, state, postcode, profile_pic)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;
    `;
    const values = [user_id, login_id, name, email, phone, city, state, postcode, profilePic];
    const result = await pool.query(query, values);

    res.json({ success: true, contact: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// Admin - list all contacts
app.get("/api/admin/contacts", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        c.id, c.name, c.email, c.phone, c.city, c.state, c.postcode, c.profile_pic, 
        u.name as user_name, u.login_id
      FROM contacts c
      JOIN users u ON c.user_id = u.id
      ORDER BY c.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Backend (server.js)
app.post("/api/login-accountant", async (req, res) => {
  const { login_id, password } = req.body;

  try {
    // Fetch user with role 'Accountant'
    const result = await pool.query(
      "SELECT * FROM users WHERE role='Accountant' AND login_id=$1",
      [login_id]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid credentials or not an accountant" });
    }

    const user = result.rows[0];

    // Compare password
    const validPw = await bcrypt.compare(password, user.password);
    if (!validPw) {
      return res.status(401).json({ success: false, message: "Wrong password" });
    }

    // Remove password before sending
    const { password: pw, ...userWithoutPassword } = user;

    res.json({ success: true, user: userWithoutPassword });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
// POST /api/products
app.post("/api/products", async (req, res) => {
  const {
    productName, productId, quantity, category,
    hsn, sales_price, purchase_price, sales_tax,
    purchase_tax, tax_name, tax_value
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO products
      (product_name, product_id, quantity, category, hsn, sales_price, purchase_price, sales_tax, purchase_tax, tax_name, tax_value)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [productName, productId, quantity, category, hsn, sales_price, purchase_price, sales_tax, purchase_tax, tax_name, tax_value]
    );

    res.json({ success: true, product: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
// GET /api/products
app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products WHERE quantity > 0 ORDER BY created_at DESC");
    res.json({ success: true, products: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
// POST /api/orders
app.post("/api/orders", async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  try {
    // Get product details
    const productResult = await pool.query("SELECT * FROM products WHERE id=$1", [product_id]);
    const product = productResult.rows[0];
    if (!product) return res.status(400).json({ success: false, message: "Product not found" });
    if (product.quantity < quantity) return res.status(400).json({ success: false, message: "Insufficient stock" });

    const total_amount = quantity * product.sales_price;

    // Insert order
    const orderResult = await pool.query(
      "INSERT INTO orders (user_id, product_id, quantity, total_amount) VALUES ($1,$2,$3,$4) RETURNING *",
      [user_id, product_id, quantity, total_amount]
    );

    // Decrease product stock
    await pool.query("UPDATE products SET quantity = quantity - $1 WHERE id=$2", [quantity, product_id]);

    // Create sales invoice
    await pool.query(
      "INSERT INTO invoices (order_id, invoice_type, total_amount) VALUES ($1,'sales',$2)",
      [orderResult.rows[0].id, total_amount]
    );

    res.json({ success: true, order: orderResult.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
// GET /api/orders/:userId
app.get("/api/orders/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      `SELECT o.*, p.product_name, p.product_id 
       FROM orders o JOIN products p ON o.product_id = p.id
       WHERE o.user_id=$1 ORDER BY o.created_at DESC`,
      [userId]
    );
    res.json({ success: true, orders: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/invoices
app.get("/api/invoices", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT i.*, o.user_id, p.product_name FROM invoices i
       JOIN orders o ON i.order_id = o.id
       JOIN products p ON o.product_id = p.id
       ORDER BY i.created_at DESC`
    );
    res.json({ success: true, invoices: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
