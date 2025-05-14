// controllers/authController.js
import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import dotenv from "dotenv";
dotenv.config()

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log(name, email, password)
    const user = await User.create({ name, email, password });
    const token = generateToken(user);
    res.json({token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        teams: user.teams
      }});
  } catch (err) {
    res.status(400).json({ error: "Email already exists or invalid data." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = generateToken(user);
  // console.log(user)
  res.json({token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        teams: user.teams
      }});
};
