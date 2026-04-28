import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"

/**
 * FIRST-TIME SIGNUP
 * userId + password + confirmPassword
 */
export const signup = async (req, res) => {
  try {
    const { userId, password, confirmPassword } = req.body;

    if (!userId || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Find user by userId in MongoDB
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "Invalid ID" });
    }

    if (user.isActivated) {
      return res.status(400).json({ message: "User already signed up" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user status and password
    user.password = hashedPassword;
    user.isActivated = true;
    await user.save();

    res.json({ message: "Signup successful" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup failed" });
  }
};

/**
 * LOGIN
 */
export const login = async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by userId
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role }, // MongoDB uses _id
      process.env.SUPER_ADMIN_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role,
      redirect:
        user.role === "SUPER_ADMIN" ? "/super-admin" :
        user.role === "HR" ? "/admin" :
        user.role === "EMPLOYEE" ? "/employee" :
        "/client"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};

/**
 * UPDATE PASSWORD (Voluntary)
 */
export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id; // From auth middleware

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Password update failed" });
  }
};
