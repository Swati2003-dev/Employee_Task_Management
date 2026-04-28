// middleware/auth.middleware.js
import jwt from "jsonwebtoken";

export const auth = (roles = []) => (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.SUPER_ADMIN_SECRET);

    if (roles.length && !roles.includes(decoded.role))
      return res.status(403).json({ message: "Access denied" });

    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }

};
