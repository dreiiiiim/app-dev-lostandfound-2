// import pool from "../config/db.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import express from "express";
// import cors from "cors";

// // REGISTER
// export const register = async (req, res) => {
//   console.log("Register called:", req.body);
 

  
//   try {
//     const { name, gender, student_id, faculty, email, password } = req.body;

//     if (!name || !gender || !student_id || !faculty || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check existing email
//     const [existing] = await pool.query(
//       "SELECT * FROM users WHERE email = ?",
//       [email]
//     );
//     if (existing.length > 0) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     const [existingStudent] = await pool.query(
//   "SELECT * FROM users WHERE student_id = ?",
//   [student_id]
// );
// if (existingStudent.length > 0) {
//   return res.status(400).json({ message: "Student ID already exists" });
// }


//     const hashedPassword = await bcrypt.hash(password, 10);

//     const sql = `
//       INSERT INTO users (name, gender, student_id, faculty, email, password)
//       VALUES (?, ?, ?, ?, ?, ?)
//     `;

//     await pool.query(sql, [
//       name,
//       gender,
//       student_id,
//       faculty,
//       email,
//       hashedPassword
//     ]);

//     res.status(201).json({ message: "User registered successfully!" });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Database insert error" });
//   }
// };

// // LOGIN
// // LOGIN
// export const login = async (req, res) => {
//   try {
//     const { student_id, password } = req.body;

//     // Check if student_id and password are provided
//     if (!student_id || !password)
//       return res.status(400).json({ message: "Student ID and password required" });

//     // Query by student_id instead of email
//     const [rows] = await pool.query(
//       "SELECT * FROM users WHERE student_id = ?",
//       [student_id]
//     );

//     if (rows.length === 0)
//       return res.status(401).json({ message: "Invalid Student ID or password" });

//     const user = rows[0];

//     // Compare password using bcrypt
//     const match = await bcrypt.compare(password, user.password);
//     if (!match)
//       return res.status(401).json({ message: "Invalid Student ID or password" });

//     // Create JWT token
//     const token = jwt.sign(
//       { user_id: user.user_id, student_id: user.student_id },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     // Respond with user info and token
//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         user_id: user.user_id,
//         name: user.name,
//         student_id: user.student_id,
//         role: user.role,
//       }
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Database error" });
//   }
// };

import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, gender, student_id, faculty, email, password } = req.body;

    if (!name || !gender || !student_id || !faculty || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check email
    const [existingEmail] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingEmail.length > 0) return res.status(400).json({ message: "Email already exists" });

    // Check student_id
    const [existingStudent] = await pool.query("SELECT * FROM users WHERE student_id = ?", [student_id]);
    if (existingStudent.length > 0) return res.status(400).json({ message: "Student ID already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (name, gender, student_id, faculty, email, password)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, gender, student_id, faculty, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database insert error" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { student_id, password } = req.body;
    if (!student_id || !password) return res.status(400).json({ message: "Student ID and password required" });

    const [rows] = await pool.query("SELECT * FROM users WHERE student_id = ?", [student_id]);
    if (rows.length === 0) return res.status(401).json({ message: "Invalid Student ID or password" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid Student ID or password" });

    // Generate JWT
    const token = jwt.sign(
      { user_id: user.user_id, student_id: user.student_id },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { user_id: user.user_id, name: user.name, student_id: user.student_id, role: user.role }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
};
