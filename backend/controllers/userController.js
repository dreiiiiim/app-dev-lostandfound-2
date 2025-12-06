
import pool from "../config/db.js";
import bcrypt from "bcryptjs";

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT user_id, name, gender, student_id, faculty, email, role, date_created FROM users"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
};

// GET USER BY ID
export const getUser = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT user_id, name, gender, student_id, faculty, email, role, date_created FROM users WHERE user_id = ?",
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
};

// CREATE NEW USER (with hashed password)
export const createUser = async (req, res) => {
  try {
    const { name, gender, student_id, faculty, email, password, role } = req.body;
    if (!name || !gender || !student_id || !faculty || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check duplicates
    const [existing] = await pool.query("SELECT * FROM users WHERE email = ? OR student_id = ?", [email, student_id]);
    if (existing.length > 0) return res.status(400).json({ message: "Email or Student ID already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users (name, gender, student_id, faculty, email, password, role)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [name, gender, student_id, faculty, email, hashedPassword, role || "Student"]);

    const [newUser] = await pool.query("SELECT user_id, name, gender, student_id, faculty, email, role, date_created FROM users WHERE user_id = ?", [result.insertId]);

    res.status(201).json({ message: "User created successfully", user: newUser[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
};

// UPDATE USER (with optional hashed password)
export const updateUser = async (req, res) => {
  try {
    const { name, gender, student_id, faculty, email, password, role } = req.body;
    const userId = req.params.id;

    // Check if user exists
    const [existingUser] = await pool.query("SELECT * FROM users WHERE user_id = ?", [userId]);
    if (existingUser.length === 0) return res.status(404).json({ message: "User not found" });

    // Hash new password if provided
    let hashedPassword = existingUser[0].password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const sql = `
      UPDATE users
      SET name = ?, gender = ?, student_id = ?, faculty = ?, email = ?, password = ?, role = ?
      WHERE user_id = ?
    `;
    await pool.query(sql, [name, gender, student_id, faculty, email, hashedPassword, role || existingUser[0].role, userId]);

    const [updatedUser] = await pool.query("SELECT user_id, name, gender, student_id, faculty, email, role, date_created FROM users WHERE user_id = ?", [userId]);
    res.json({ message: "User updated successfully", user: updatedUser[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await pool.query("DELETE FROM users WHERE user_id = ?", [userId]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
};

// GET PROFILE (for logged-in user via JWT)
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const [rows] = await pool.query(
      "SELECT user_id, name, gender, student_id, faculty, email, role, date_created FROM users WHERE user_id = ?",
      [userId]
    );
    if (rows.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
};
