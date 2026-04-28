import User from "../models/User.js";
import bcrypt from "bcrypt";

/**
 * SUPER ADMIN → CREATE HR / CLIENT / EMPLOYEE
 */
export const createUser = async (req, res) => {
  try {
    const { name, email, userId, role } = req.body;

    if (!name || !email || !userId || !role) {
      return res.status(400).json({ message: "All fields (name, email, userId, role) are required" });
    }

    // Default password
    const defaultPassword = "password123";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      userId,
      role,
      password: hashedPassword,
      createdBy: req.user.id
    });

    await newUser.save();

    // Simulate sending email
    console.log(`\n📧 EMAIL SENT TO: ${email}`);
    console.log(`Subject: Your ETM Account Credentials`);
    console.log(`Body: Hello ${name}, your account has been created. \nID: ${userId} \nPassword: ${defaultPassword}\n`);

    res.json({
      message: "User created successfully and email 'sent'",
      userId,
      role
    });

  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "User ID or Email already exists" });
    }
    res.status(500).json({ message: "User creation failed" });
  }
};

/**
 * HR → CREATE EMPLOYEE
 */
export const createEmployee = async (req, res) => {
  try {
    const { name, email, userId } = req.body;

    if (!name || !email || !userId) {
      return res.status(400).json({ message: "All fields (name, email, userId) are required" });
    }

    const defaultPassword = "password123";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // Create new employee
    const newEmployee = new User({
      name,
      email,
      userId,
      role: 'EMPLOYEE',
      password: hashedPassword,
      createdBy: req.user.id
    });

    await newEmployee.save();

    // Simulate sending email
    console.log(`\n📧 EMAIL SENT TO: ${email}`);
    console.log(`Subject: Your Employee Account Credentials`);
    console.log(`Body: Hello ${name}, your employee account has been created. \nID: ${userId} \nPassword: ${defaultPassword}\n`);

    res.json({
      message: "Employee created successfully and email 'sent'",
      userId
    });

  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "User ID or Email already exists" });
    }
    res.status(500).json({ message: "Employee creation failed" });
  }
};

