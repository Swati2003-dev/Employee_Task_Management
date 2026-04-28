import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    const usersToSeed = [
      { userId: "ADMIN001", role: "SUPER_ADMIN", name: "Super Admin", email: "superadmin@example.com", password: "password123" },
      { userId: "HR001", role: "HR", name: "HR Manager", email: "hr@example.com", password: "password123" },
      { userId: "EMP001", role: "EMPLOYEE", name: "John Employee", email: "employee@example.com", password: "password123" },
      { userId: "CLI001", role: "CLIENT", name: "Client User", email: "client@example.com", password: "password123" },
    ];


    for (const userData of usersToSeed) {
      const existingUser = await User.findOne({ userId: userData.userId });
      if (existingUser) {
        console.log(`User ${userData.userId} already exists.`);
      } else {
        const user = new User({
          ...userData,
          isActivated: false
        });
        await user.save();
        console.log(`User ${userData.userId} (${userData.role}) created successfully!`);
      }
    }

    console.log("\nAll seed users created. You can now use these IDs on the SignUp page.");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedUsers();
