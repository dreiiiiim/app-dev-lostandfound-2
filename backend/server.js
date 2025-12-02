

// import express from "express";
// import cors from "cors";
// import mysql from "mysql2/promise";
// import bcrypt from "bcrypt";
// import multer from "multer";
// import path from "path";
// import userRoutes from "./routes/user.js";
// import dotenv from "dotenv";






// const app = express();

// dotenv.config();

// app.use("/users", userRoutes);

// // Allow any localhost port dynamically
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

// app.use(express.json());

// // Serve uploads folder
// app.use("/uploads", express.static("uploads"));


// // -------------------------
// // 📌  CONNECT TO DATABASE
// // -------------------------
// const db = await mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "lostandfound",
// });


// // ---------------------------------
// // 📌 MULTER SETUP FOR IMAGE UPLOAD
// // ---------------------------------
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/found"),
//   filename: (req, file, cb) =>
//     cb(null, Date.now() + path.extname(file.originalname)),
// });

// const upload = multer({ storage });


// // -------------------------
// // 📌 REGISTER ROUTE
// // -------------------------
// app.post("/auth/register", async (req, res) => {
//   const { name, student_id, email, password, faculty, gender } = req.body;

//   if (!name || !student_id || !email || !password) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   try {
//     const [rows] = await db.execute(
//       "SELECT * FROM users WHERE student_id = ?",
//       [student_id]
//     );
//     if (rows.length > 0) {
//       return res
//         .status(409)
//         .json({ message: "Student ID already registered" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const role = "Student";

//     const [result] = await db.execute(
//       `INSERT INTO users 
//        (name, student_id, email, password, faculty, gender, role, date_created)
//        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
//       [name, student_id, email, hashedPassword, faculty, gender, role]
//     );

//     const [newUserRows] = await db.execute(
//       "SELECT * FROM users WHERE user_id = ?",
//       [result.insertId]
//     );

//     res.status(201).json({
//       message: "User registered successfully",
//       user: newUserRows[0],
//       token: "fake-jwt-token",
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Database error" });
//   }
// });


// // -------------------------
// // 📌 LOGIN ROUTE
// // -------------------------
// app.post("/auth/login", async (req, res) => {
//   const { student_id, password } = req.body;

//   try {
//     const [rows] = await db.execute(
//       "SELECT * FROM users WHERE student_id = ?",
//       [student_id]
//     );
//     if (rows.length === 0)
//       return res.status(401).json({ message: "Invalid credentials" });

//     const user = rows[0];
//     const isValid = await bcrypt.compare(password, user.password);

//     if (!isValid)
//       return res.status(401).json({ message: "Invalid credentials" });

//     res.json({ message: "Login successful", user, token: "fake-jwt-token" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Database error" });
//   }
// });


// // -------------------------
// // 📌 GET USER PROFILE
// // -------------------------
// app.get("/users/:id", async (req, res) => {
//   try {
//     const [rows] = await db.execute(
//       "SELECT * FROM users WHERE user_id = ?",
//       [req.params.id]
//     );

//     if (rows.length === 0)
//       return res.status(404).json({ message: "User not found" });

//     res.json(rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Database error" });
//   }
// });


// // ----------------------------------------------------
// // 📌 FOUND ITEM: CREATE NEW FOUND ITEM (WITH IMAGE)
// // ----------------------------------------------------
// app.post(
//   "/api/found-items/create",
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       const { item_name, location_found, date_found, description } = req.body;

//       if (!item_name || !location_found || !date_found || !description) {
//         return res.status(400).json({ message: "All fields are required." });
//       }

//       if (!req.file) {
//         return res.status(400).json({ message: "Image upload is required." });
//       }

//       const imageUrl = `/uploads/found/${req.file.filename}`;

//       await db.execute(
//         `INSERT INTO found_items 
//          (item_name, location_found, date_found, description, image_url, created_at)
//          VALUES (?, ?, ?, ?, ?, NOW())`,
//         [item_name, location_found, date_found, description, imageUrl]
//       );

//       res.json({ success: true, message: "Found item posted successfully!" });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Database error" });
//     }
//   }
// );

// // GET all found items
// app.get("/api/found-items", async (req, res) => {
//   try {
//     const [rows] = await db.execute(
//       `SELECT id, item_name, location_found, date_found, description, image_url
//        FROM found_items
//        ORDER BY created_at DESC`
//     );
//     res.json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Database error" });
//   }
// });



// // -------------------------
// // 📌 START SERVER
// // -------------------------
// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// -------------------------
// 📌 DATABASE CONNECTION
// -------------------------
const db = await mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "lostandfound",
});

// -------------------------
// 📌 MULTER SETUP (FOR IMAGES)
// -------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/found"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// -------------------------
// 📌 AUTH MIDDLEWARE
// -------------------------
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, process.env.JWT_SECRET || "supersecretkey", (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// -------------------------
// 📌 REGISTER
// -------------------------
app.post("/auth/register", async (req, res) => {
  const { name, student_id, email, password, faculty, gender } = req.body;
  if (!name || !student_id || !email || !password || !faculty || !gender)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const [existingStudent] = await db.execute(
      "SELECT * FROM users WHERE student_id = ?",
      [student_id]
    );
    if (existingStudent.length > 0)
      return res.status(409).json({ message: "Student ID already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = "Student";

    const [result] = await db.execute(
      `INSERT INTO users
       (name, student_id, email, password, faculty, gender, role, date_created)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [name, student_id, email, hashedPassword, faculty, gender, role]
    );

    const [newUserRows] = await db.execute(
      "SELECT * FROM users WHERE user_id = ?",
      [result.insertId]
    );

    const token = jwt.sign(
      { user_id: newUserRows[0].user_id, student_id },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: newUserRows[0],
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

// -------------------------
// 📌 LOGIN
// -------------------------
app.post("/auth/login", async (req, res) => {
  const { student_id, password } = req.body;
  if (!student_id || !password)
    return res.status(400).json({ message: "Student ID and password required" });

  try {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE student_id = ?",
      [student_id]
    );
    if (rows.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { user_id: user.user_id, student_id: user.student_id },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

// -------------------------
// 📌 USER CRUD
// -------------------------

// Get all users
app.get("/users", authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

// Get user by ID
app.get("/users/:id", authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE user_id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

// Update user
// app.put("/users/:id", authenticateToken, async (req, res) => {
//   const { name, gender, faculty, email } = req.body;
//   try {
//     await db.execute(
//       "UPDATE users SET name = ?, gender = ?, faculty = ?, email = ? WHERE user_id = ?",
//       [name, gender, faculty, email, req.params.id]
//     );
//     res.json({ message: "User updated successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Database error" });
//   }
// });
app.put("/users/:id", authenticateToken, async (req, res) => {
  const { name, gender, faculty, email } = req.body;

  try {
    // Fetch current user data
    const [rows] = await db.execute("SELECT * FROM users WHERE user_id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "User not found" });

    const user = rows[0];

    // Use existing value if not provided
    const updatedName = name || user.name;
    const updatedGender = gender || user.gender;
    const updatedFaculty = faculty || user.faculty;
    const updatedEmail = email || user.email;

    await db.execute(
      "UPDATE users SET name = ?, gender = ?, faculty = ?, email = ? WHERE user_id = ?",
      [updatedName, updatedGender, updatedFaculty, updatedEmail, req.params.id]
    );

    // Return updated user
    const [updatedRows] = await db.execute("SELECT * FROM users WHERE user_id = ?", [req.params.id]);
    res.json({ message: "User updated successfully", user: updatedRows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

// Delete user
app.delete("/users/:id", authenticateToken, async (req, res) => {
  try {
    await db.execute("DELETE FROM users WHERE user_id = ?", [req.params.id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

// -------------------------
// 📌 FOUND ITEMS
// -------------------------

// Create found item
app.post("/api/found-items/create", authenticateToken, upload.single("image"), async (req, res) => {
  const { item_name, location_found, date_found, description } = req.body;

  if (!item_name || !location_found || !date_found || !description)
    return res.status(400).json({ message: "All fields are required." });

  if (!req.file) return res.status(400).json({ message: "Image upload is required." });

  try {
    const imageUrl = `/uploads/found/${req.file.filename}`;
    await db.execute(
      `INSERT INTO found_items (item_name, location_found, date_found, description, image_url, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [item_name, location_found, date_found, description, imageUrl]
    );
    res.json({ success: true, message: "Found item posted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

// Get all found items
app.get("/api/found-items", async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT id, item_name, location_found, date_found, description, image_url
       FROM found_items
       ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

// -------------------------
// 📌 START SERVER
// -------------------------
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
