import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

// Create HTTP server for socket.io
const server = http.createServer(app);

// Initialize socket.io server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // The frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// In-memory user map to track connected users (userId -> socketId)
const users = {};

// Handle socket connections
io.on("connection", (socket) => {
  // Get the userId from the query parameters
  const userId = socket.handshake.query.userId;

  console.log(" Socket connected:", socket.id);
  console.log(" Received userId:", userId);

  if (userId) {
    // Add user to the users map
    users[userId] = socket.id;
    // Emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(users));
    console.log(" Online users broadcasted:", Object.keys(users));
  }

  // Handle disconnection
  socket.on("disconnect", () => {
    delete users[userId]; // Remove user from the map
    io.emit("getOnlineUsers", Object.keys(users)); // Emit updated online users list
    console.log("Disconnected:", userId);
    console.log(" Remaining users:", Object.keys(users));
  });
});

// Start the server on port 2000
server.listen(2000, () => {
  console.log("Server running on http://localhost:2000");
});

export { app, io, server };
