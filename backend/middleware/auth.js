import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization; // or from headers
  console.log(token,"token in verifyToken")
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // attach user info to request
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};