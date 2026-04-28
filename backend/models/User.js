import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    enum: ['SUPER_ADMIN', 'HR', 'EMPLOYEE', 'CLIENT'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
