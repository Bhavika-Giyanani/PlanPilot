import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const protect = async (req, res, next) => {
  try {
    const authHeader = await req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    const token = authHeader.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log("Decoded", decoded);
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is Invalid or Expired." });
  }
};
