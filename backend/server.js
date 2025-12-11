
// // import express from "express";
// // import cors from "cors";
// // import mysql from "mysql2/promise";
// // import bcrypt from "bcryptjs";
// // import jwt from "jsonwebtoken";
// // import multer from "multer";
// // import path from "path";
// // import dotenv from "dotenv";
// // import userRoutes from "./routes/user.js";
// // import foundRoutes from "./routes/foundItems.js";
// // import lostRoutes from "./routes/lostitems.js";






// // dotenv.config();
// // const app = express();

// // app.use(cors());
// // app.use(express.json());
// // app.use("/uploads", express.static("uploads"));


// // // -------------------------
// // // DATABASE CONNECTION
// // // -------------------------
// // const db = await mysql.createConnection({
// //   host: process.env.DB_HOST || "localhost",
// //   user: process.env.DB_USER || "root",
// //   password: process.env.DB_PASSWORD || "",
// //   database: process.env.DB_NAME || "lostandfound",
// // });



// // app.use("/api/users", userRoutes);       // All user routes, e.g., GET /api/users/:id
// // app.use("/api/found-items", foundRoutes); // All found items routes
// // app.use("/api/lost-items", lostRoutes);   // All lost items routes





// // // -------------------------
// // // MULTER FOR FOUND ITEMS
// // // -------------------------
// // const storageFound = multer.diskStorage({
// //   destination: (req, file, cb) => cb(null, "uploads/found"),
// //   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
// // });
// // const uploadFound = multer({ storage: storageFound });

// // // -------------------------
// // // AUTH MIDDLEWARE
// // // -------------------------
// // const authenticateToken = (req, res, next) => {
// //   const authHeader = req.headers["authorization"];
// //   const token = authHeader && authHeader.split(" ")[1];
// //   if (!token) return res.status(401).json({ message: "Token missing" });

// //   jwt.verify(token, process.env.JWT_SECRET || "supersecretkey", (err, user) => {
// //     if (err) return res.status(403).json({ message: "Invalid token" });
// //     req.user = user;
// //     next();
// //   });
// // };

// // // -------------------------
// // // USER AUTH & CRUD
// // // -------------------------

// // // REGISTER
// // app.post("/auth/register", async (req, res) => {
// //   const { name, student_id, email, password, faculty, gender } = req.body;
// //   if (!name || !student_id || !email || !password || !faculty || !gender)
// //     return res.status(400).json({ message: "All fields are required" });

// //   try {
// //     const [existingStudent] = await db.execute(
// //       "SELECT * FROM users WHERE student_id = ?",
// //       [student_id]
// //     );
// //     if (existingStudent.length > 0)
// //       return res.status(409).json({ message: "Student ID already registered" });

// //     const hashedPassword = await bcrypt.hash(password, 10);
// //     const role = "Student";

// //     const [result] = await db.execute(
// //       `INSERT INTO users
// //        (name, student_id, email, password, faculty, gender, role, date_created)
// //        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
// //       [name, student_id, email, hashedPassword, faculty, gender, role]
// //     );

// //     const [newUserRows] = await db.execute(
// //       "SELECT * FROM users WHERE user_id = ?",
// //       [result.insertId]
// //     );

// //     const token = jwt.sign(
// //       { user_id: newUserRows[0].user_id, student_id },
// //       process.env.JWT_SECRET || "supersecretkey",
// //       { expiresIn: "1d" }
// //     );

// //     res.status(201).json({
// //       message: "User registered successfully",
// //       user: newUserRows[0],
// //       token,
// //     });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Database error" });
// //   }
// // });

// // // LOGIN
// // app.post("/auth/login", async (req, res) => {
// //   const { student_id, password } = req.body;
// //   if (!student_id || !password)
// //     return res.status(400).json({ message: "Student ID and password required" });

// //   try {
// //     const [rows] = await db.execute(
// //       "SELECT * FROM users WHERE student_id = ?",
// //       [student_id]
// //     );
// //     if (rows.length === 0)
// //       return res.status(401).json({ message: "Invalid credentials" });

// //     const user = rows[0];
// //     const isValid = await bcrypt.compare(password, user.password);
// //     if (!isValid)
// //       return res.status(401).json({ message: "Invalid credentials" });

// //     const token = jwt.sign(
// //       { user_id: user.user_id, student_id: user.student_id },
// //       process.env.JWT_SECRET || "supersecretkey",
// //       { expiresIn: "1d" }
// //     );

// //     res.json({ message: "Login successful", user, token });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Database error" });
// //   }
// // });

// // // -------------------------
// // // FOUND ITEMS ROUTES
// // // -------------------------

// // // CREATE FOUND ITEM
// // app.post("/api/found-items/create", authenticateToken, uploadFound.single("image"), async (req, res) => {
// //   const { item_name, location_found, date_found, description } = req.body;

// //   if (!item_name || !location_found || !date_found || !description)
// //     return res.status(400).json({ message: "All fields are required." });

// //   if (!req.file)
// //     return res.status(400).json({ message: "Image upload is required." });

// //   try {
// //     const imageUrl = `/uploads/found/${req.file.filename}`;
// //     await db.execute(
// //       `INSERT INTO found_items
// //        (item_name, location_found, date_found, description, image_url, created_at)
// //        VALUES (?, ?, ?, ?, ?, NOW())`,
// //       [item_name, location_found, date_found, description, imageUrl]
// //     );
// //     res.json({ success: true, message: "Found item posted successfully!" });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Database error" });
// //   }
// // });

// // // GET ALL FOUND ITEMS
// // app.get("/api/found-items", async (req, res) => {
// //   try {
// //     const [rows] = await db.execute(
// //       `SELECT id, item_name, location_found, date_found, description, image_url
// //        FROM found_items
// //        ORDER BY created_at DESC`
// //     );
// //     res.json(rows);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Database error" });
// //   }
// // });



// // // -------------------------
// // // START SERVER
// // // -------------------------
// // const PORT = process.env.PORT || 3001;
// // app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


// import express from "express";
// import cors from "cors";
// import mysql from "mysql2/promise";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import multer from "multer";
// import path from "path";
// import dotenv from "dotenv";
// import userRoutes from "./routes/user.js";
// import foundRoutes from "./routes/foundItems.js";
// import lostRoutes from "./routes/lostitems.js"; // Importing the function

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// // -------------------------
// // DATABASE CONNECTION
// // -------------------------
// const db = await mysql.createConnection({
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASSWORD || "",
//   database: process.env.DB_NAME || "lostandfound",
// });

// console.log("Database connected successfully.");

// // -------------------------
// // MULTER FOR FOUND ITEMS (Kept separate as per your code)
// // -------------------------
// const storageFound = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/found"),
//   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
// });
// const uploadFound = multer({ storage: storageFound });

// // -------------------------
// // AUTH MIDDLEWARE
// // -------------------------
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Token missing" });

//   jwt.verify(token, process.env.JWT_SECRET || "supersecretkey", (err, user) => {
//     if (err) return res.status(403).json({ message: "Invalid token" });
//     req.user = user;
//     next();
//   });
// };

// // -------------------------
// // ROUTES
// // -------------------------
// app.use("/api/users", userRoutes);        
// app.use("/api/found-items", foundRoutes); 
// // FIX: Pass the 'db' connection into the lostRoutes function
// app.use("/api/lost-items", lostRoutes(db)); 

// // -------------------------
// // USER AUTH & CRUD
// // -------------------------
// // (Kept your existing auth routes here)

// app.post("/auth/register", async (req, res) => {
//   const { name, student_id, email, password, faculty, gender } = req.body;
//   if (!name || !student_id || !email || !password || !faculty || !gender)
//     return res.status(400).json({ message: "All fields are required" });

//   try {
//     const [existingStudent] = await db.execute(
//       "SELECT * FROM users WHERE student_id = ?",
//       [student_id]
//     );
//     if (existingStudent.length > 0)
//       return res.status(409).json({ message: "Student ID already registered" });

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

//     const token = jwt.sign(
//       { user_id: newUserRows[0].user_id, student_id },
//       process.env.JWT_SECRET || "supersecretkey",
//       { expiresIn: "1d" }
//     );

//     res.status(201).json({
//       message: "User registered successfully",
//       user: newUserRows[0],
//       token,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Database error" });
//   }
// });

// app.post("/auth/login", async (req, res) => {
//   const { student_id, password } = req.body;
//   if (!student_id || !password)
//     return res.status(400).json({ message: "Student ID and password required" });

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

//     const token = jwt.sign(
//       { user_id: user.user_id, student_id: user.student_id },
//       process.env.JWT_SECRET || "supersecretkey",
//       { expiresIn: "1d" }
//     );

//     res.json({ message: "Login successful", user, token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Database error" });
//   }
// });

// // -------------------------
// // FOUND ITEMS ROUTES (Kept inline as per your code)
// // -------------------------
// app.post("/api/found-items/create", authenticateToken, uploadFound.single("image"), async (req, res) => {
//   const { item_name, location_found, date_found, description } = req.body;

//   if (!item_name || !location_found || !date_found || !description)
//     return res.status(400).json({ message: "All fields are required." });

//   if (!req.file)
//     return res.status(400).json({ message: "Image upload is required." });

//   try {
//     const imageUrl = `/uploads/found/${req.file.filename}`;
//     await db.execute(
//       `INSERT INTO found_items
//        (item_name, location_found, date_found, description, image_url, created_at)
//        VALUES (?, ?, ?, ?, ?, NOW())`,
//       [item_name, location_found, date_found, description, imageUrl]
//     );
//     res.json({ success: true, message: "Found item posted successfully!" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Database error" });
//   }
// });

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
// // START SERVER
// // -------------------------
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



// // // app.js
// // import express from "express";
// // import cors from "cors";
// // import mysql from "mysql2/promise";
// // import dotenv from "dotenv";
// // import foundRoutes from "./routes/foundItems.js";
// // import lostRoutes from "./routes/lostitems.js";
// // import userRoutes from "./routes/user.js";

// // dotenv.config();
// // const app = express();

// // app.use(cors());
// // app.use(express.json());
// // app.use("/uploads", express.static("uploads"));

// // // -------------------------
// // // DATABASE CONNECTION
// // // -------------------------
// // const db = await mysql.createConnection({
// //   host: process.env.DB_HOST || "127.0.0.1",
// //   user: process.env.DB_USER || "root",
// //   password: process.env.DB_PASSWORD || "",
// //   database: process.env.DB_NAME || "lostandfound",
// // });

// // console.log("Database connected successfully.");

// // // -------------------------
// // // ROUTES -- pass db into route factories
// // // -------------------------
// // app.use("/api/users", userRoutes);
// // app.use("/api/found-items", foundRoutesFactory(db)); // <-- mount factory result at /api/found-items
// // app.use("/api/lost-items", lostRoutesFactory(db));   // <-- mount factory result at /api/lost-items

// // // (auth routes kept inline if you want them here)
// // // ... your /auth/register and /auth/login routes (if still used) ...

// // const PORT = process.env.PORT || 3001;
// // app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));













































// server.js
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";

import userRoutes from "./routes/user.js";
import foundRoutes from "./routes/foundItems.js";
import lostRoutes from "./routes/lostitems.js";

dotenv.config(); // MUST run before reading process.env

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// -------------------------
// DB config (uses DB_PORT; default 3307)
// -------------------------
const DB_HOST = process.env.DB_HOST || "127.0.0.1";
const DB_PORT = Number(process.env.DB_PORT ?? 3307);
const DB_USER = process.env.DB_USER || "root";
// Accept either DB_PASS or DB_PASSWORD in .env
const DB_PASS = process.env.DB_PASS ?? process.env.DB_PASSWORD ?? "";
const DB_NAME = process.env.DB_NAME || "lostandfound";

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// helper which mounts either a router or a factory that takes (db)
const mount = (maybeFactory) => {
  try {
    return typeof maybeFactory === "function" && maybeFactory.length > 0
      ? maybeFactory(pool) // assume it's a factory expecting db/pool
      : maybeFactory; // assume it's already an express.Router
  } catch (err) {
    console.error("Error mounting route:", err);
    return maybeFactory;
  }
};

// Startup DB test (ping)
(async () => {
  try {
    console.log(`Attempting DB -> host=${DB_HOST} port=${DB_PORT} user=${DB_USER} db=${DB_NAME}`);
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log("✅ DB pool connected (ping succeeded)");
  } catch (err) {
    console.error("❌ DB pool test failed:", err && err.code ? { code: err.code, message: err.message } : err);
    // optional: process.exit(1);
  }
})();

// -------------------------
// Multer for found items
// -------------------------
const storageFound = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/found"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const uploadFound = multer({ storage: storageFound });

// -------------------------
// Auth middleware
// -------------------------
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, process.env.JWT_SECRET || "supersecretkey", (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// -------------------------
// Routes (mount routers or factories)
// -------------------------
app.use("/api/users", mount(userRoutes));
app.use("/api/found-items", mount(foundRoutes));
app.use("/api/lost-items", mount(lostRoutes));

// -------------------------
// Inline auth & found routes (kept from your original file)
// Note: these handlers use `pool` (connection pool) instead of db.execute
// -------------------------

// REGISTER
app.post("/auth/register", async (req, res) => {
  const { name, student_id, email, password, faculty, gender } = req.body;
  if (!name || !student_id || !email || !password || !faculty || !gender)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const [existingStudent] = await pool.execute("SELECT * FROM users WHERE student_id = ?", [student_id]);
    if (existingStudent.length > 0)
      return res.status(409).json({ message: "Student ID already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = "Student";

    const [result] = await pool.execute(
      `INSERT INTO users
       (name, student_id, email, password, faculty, gender, role, date_created)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [name, student_id, email, hashedPassword, faculty, gender, role]
    );

    const [newUserRows] = await pool.execute("SELECT * FROM users WHERE user_id = ?", [result.insertId]);

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

// LOGIN
app.post("/auth/login", async (req, res) => {
  const { student_id, password } = req.body;
  if (!student_id || !password)
    return res.status(400).json({ message: "Student ID and password required" });

  try {
    const [rows] = await pool.execute("SELECT * FROM users WHERE student_id = ?", [student_id]);
    if (rows.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

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

// CREATE FOUND ITEM
app.post(
  "/api/found-items/create",
  authenticateToken,
  uploadFound.single("image"),
  async (req, res) => {
    const { item_name, location_found, date_found, description } = req.body;

    if (!item_name || !location_found || !date_found || !description)
      return res.status(400).json({ message: "All fields are required." });

    if (!req.file) return res.status(400).json({ message: "Image upload is required." });

    try {
      const imageUrl = `/uploads/found/${req.file.filename}`;
      await pool.execute(
        `INSERT INTO found_items
         (item_name, location_found, date_found, description, image_url, created_at)
         VALUES (?, ?, ?, ?, ?, NOW())`,
        [item_name, location_found, date_found, description, imageUrl]
      );
      res.json({ success: true, message: "Found item posted successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
    }
  }
);

// GET ALL FOUND ITEMS
app.get("/api/found-items", async (req, res) => {
  try {
    const [rows] = await pool.execute(
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

// TEMP: Inline DELETE handler to ensure route exists
app.delete("/api/found-items/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`[INLINE DELETE] request for id=${id}`);
  try {
    const [rows] = await pool.execute("SELECT * FROM found_items WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Item not found" });

    await pool.execute("DELETE FROM found_items WHERE id = ?", [id]);
    console.log(`[INLINE DELETE] id=${id} deleted`);
    return res.json({ success: true, message: "Item removed successfully" });
  } catch (err) {
    console.error("[INLINE DELETE] error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});
// TEMP INLINE: ensure GET /api/found-items/:id and DELETE work now
app.get("/api/found-items/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute("SELECT * FROM found_items WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Item not found" });
    return res.json(rows[0]);
  } catch (err) {
    console.error("[INLINE GET] error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});
// -------------------------
// START SERVER
// -------------------------
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

export default app;
