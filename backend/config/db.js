// import mysql from "mysql2/promise";
// import dotenv from "dotenv";
// dotenv.config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST || "127.0.0.1",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASS || "",
//   database: process.env.DB_NAME || "lostandfound",
//   waitForConnections: true,
//   connectionLimit: 10,
// });

/// backend/config/db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const DB_HOST = process.env.DB_HOST || "127.0.0.1";
const DB_PORT = Number(process.env.DB_PORT || 3307);
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "lostandfound";

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Optional quick test (comment out if you don't want startup test)
(async () => {
  try {
    const [r] = await pool.query("SELECT 1 AS ok");
    console.log("DB pool OK:", r[0]);
  } catch (e) {
    console.error("DB pool test failed:", e.code, e.message);
  }
})();

export default pool;
