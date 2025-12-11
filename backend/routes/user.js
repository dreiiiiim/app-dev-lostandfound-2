
import express from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getProfile,
} from "../controllers/userController.js";

import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC ROUTES
router.get("/", getAllUsers);         // GET all users
router.post("/", createUser);         // CREATE new user

// PROTECTED ROUTES
router.get("/profile", authenticateToken, getProfile); // MUST come before :id
router.put("/:id", authenticateToken, updateUser);     // UPDATE user
router.delete("/:id", deleteUser);  // DELETE user
router.get("/:id", getUser);        // GET user by ID

export default router;


