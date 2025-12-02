

// import express from "express";
// import { register, login } from "../controllers/authController.js";
// import { authenticateToken } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);
// // Only authenticated users can access their profile
// router.get("/profile", authenticateToken, getProfile);

// export default router;

// import express from "express";
// import { register, login } from "../controllers/authController.js";
// import { authenticateToken } from "../middleware/authMiddleware.js";
// import {
//   getAllUsers,
//   getUser,
//   createUser,
//   updateUser,
//   deleteUser,
//   getProfile
// } from "../controllers/userController.js";

// const router = express.Router();

// // ----- AUTH -----
// router.post("/register", register);
// router.post("/login", login);

// // ----- PROFILE -----
// router.get("/profile", authenticateToken, getProfile);

// // ----- USER CRUD -----
// router.get("/users", getAllUsers);          // Get all users
// router.get("/users/:id", getUser);          // Get single user by ID
// router.post("/users", createUser);          // Create new user
// router.put("/users/:id", updateUser);       // Update user by ID
// router.delete("/users/:id", deleteUser);    // Delete user by ID

// export default router;


import express from "express";
import { getUser } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getProfile
} from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC ROUTES
router.get("/", getAllUsers);       // GET all users
router.get("/:id", authenticateToken, getUser);        // GET user by ID
router.post("/", createUser);       // CREATE new user

// PROTECTED ROUTES (need token)
router.put("/:id", authenticateToken, updateUser);
router.delete("/:id", authenticateToken, deleteUser);
router.get("/profile", authenticateToken, getProfile);

export default router;
