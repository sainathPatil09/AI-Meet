
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"
import teamRoutes from "./routes/teamRoutes.js"
import connectDB from "./config/db.js"
import { verifyToken } from "./middleware/auth.js";
import http from 'http';
import { Server } from 'socket.io';


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



// Create HTTP server and attach socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for development
    methods: ["GET", "POST"]
  }
});

// Socket.io logic
io.on('connection', socket => {
  console.log('🔌 New client connected:', socket.id);

  socket.on('join-room', roomId => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', socket.id);
  });

  socket.on('signal', ({ roomId, signalData, to }) => {
    io.to(to).emit('signal', {
      from: socket.id,
      signalData
    });
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

