
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"
import teamRoutes from "./routes/teamRoutes.js"
import connectDB from "./config/db.js"
import { verifyToken } from "./middleware/auth.js";

dotenv.config();
const PORT = process.env.PORT || 5000

const app = express();
app.use(cors());
app.use(express.json());

connectDB()

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/teams", verifyToken, teamRoutes);


app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

