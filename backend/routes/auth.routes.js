import express from "express";
import { signup, login, updatePassword } from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/auth/signup
 * @desc    First-time signup using ID
 * @access  Public
 */
router.post("/signup", signup);

/**
 * @route   POST /api/auth/login
 * @desc    Login using ID & password
 * @access  Public
 */
router.post("/login", login);

/**
 * @route   POST /api/auth/update-password
 * @desc    Change password voluntarily
 * @access  Protected
 */
router.post("/update-password", auth(), updatePassword);

export default router;
