import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider"; // Ensure you have your AuthProvider correctly set
import io from "socket.io-client";

const socketContext = createContext();

// Custom hook to use socket context
export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Get user data from localStorage or session
  const storedUser = localStorage.getItem("ChatApp");
  const authUser = storedUser ? JSON.parse(storedUser)?.user : null;

  useEffect(() => {
    // Proceed if user is authenticated
    if (authUser?._id) {
      console.log("📤 Connecting with userId:", authUser._id);
const backendUrl = "https://chatapp-4-ca16.onrender.com"
      // Create socket connection
      const newSocket = io(`${backendUrl}`, {
        query: { userId: authUser._id },
        transports:['websocket','polling'],  //allow both websocket and polling
        
      });

      // Handle socket connection
      newSocket.on("connect", () => {
        console.log("✅ Socket connected:", newSocket.id);
      });

      // Update online users list
      newSocket.on("getOnlineUsers", (users) => {
        console.log("📥 Online users received:", users);
        setOnlineUsers(users);
      });

      // Handle connection error
      newSocket.on("connect_error", (err) => {
        console.error("❌ Connection failed:", err.message);
      });

      // Set socket state
      setSocket(newSocket);

      // Clean up socket connection on component unmount
      return () => newSocket.disconnect();
    }
  }, [authUser?._id]); // Dependency on user ID to handle changes

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};





//test userid  = 6816106c1119916ad0b467f9
//dhanyauserid = 6817412e0502a606fe78da6a