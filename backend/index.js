// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// //import all route
// import userRouter from './route/user.js';
// import messageRouter from './route/message.route.js';

// import { io, server } from './socketIo/serverIo.js';
// const app = express();
// //allow this frontend path or url
// app.use(cookieParser());
// app.use(cors(
//   {
//     origin: ["http://localhost:5173"],
//     credentials: true   ////must be require when want to set cookie or token
//   }
// ))
// // Middleware to parse JSON
// app.use(express.json());
// dotenv.config();



// app.listen(2000, () => {
//   console.log(`server is runnig on port:${2000}`);
// });

// //All route 
// app.use('/user',userRouter);
// app.use('/message',messageRouter);




// // dbconnection code below...
// try {
//   const db_name = "chatApp";
//   const db_connect = mongoose.connect(
//     `${process.env.DB_CONNECT_URL}+${db_name}+${process.env.PORT}`
//   );

//   if (db_connect) {
//     console.log("..............DB CONNECTED SUCCESSFULLY..........");
//   } else {
//     console.log("Failed db connnection please try again....!");
//   }
// } catch (error) {
//   console.log("Something Went Wrong ...", error);
// }






import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// Routes
import userRouter from './route/user.js';
import messageRouter from './route/message.route.js';

dotenv.config();

const app = express();
const server = http.createServer(app); // 🔥 Attach Express to HTTP server

const io = new Server(server, {
  cors: {
    origin:"https://mern-chatapp.netlify.app",
    // "http://localhost:5173", // Frontend URL
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
  }
});

// Middleware setup
app.use(cors({
  origin:"https://mern-chatapp.netlify.app",
  //  "http://localhost:5173", // React frontend URL
  credentials: true // Enable credentials (cookies, authentication)
}));
app.use(express.json()); // Middleware to parse JSON
app.use(cookieParser()); // Middleware to parse cookies

// Routes
app.use('/user', userRouter); // User routes
app.use('/message', messageRouter); // Message routes

// MongoDB connection
const db_name = "chat-app";
mongoose.connect(`${process.env.DB_CONNECT_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ DB connected successfully"))
  .catch((err) => console.error("❌ DB connection error", err));

// Socket.io setup
const users = {}; // Keep track of connected users

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("🔌 New socket connected:", socket.id, "UserID:", userId);

  if (userId) {
    users[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(users)); // Notify all clients of the online users
    console.log(Object.keys(users));//onlin userid both
    
  }

  socket.on("disconnect", () => {
    delete users[userId]; // Remove user on disconnect
    io.emit("getOnlineUsers", Object.keys(users)); // Notify all clients of the updated online users list
    console.log("❌ User disconnected:", userId);
  });
});

// Start the server
server.listen(2000, () => {
  console.log("🚀 Server + Socket.io running on port 2000");
});
