import express from "express";
import { createUser, createEmployee } from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";

import User from "../models/User.js";

const router = express.Router();

/**
 * @route   POST /api/users/create-user
 * @desc    Super Admin creates HR or Client
 * @access  SUPER_ADMIN
 */
router.post("/create-user",auth(["SUPER_ADMIN"]),createUser);

/**
 * @route   POST /api/users/create-employee
 * @desc    HR creates Employee
 * @access  HR
 */
router.post("/create-employee",auth(["HR"]),createEmployee);

/**
 * @route   GET /api/users
 * @desc    Get all users (Super Admin)
 * @access  SUPER_ADMIN
 */
router.get("/", auth(["SUPER_ADMIN"]), async (req, res) => {
  try {
    const users = await User.find({}, "name email userId role createdAt");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

export default router;
