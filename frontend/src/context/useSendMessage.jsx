import React, { useState } from "react";
import UseConversation from "../zustand/UseConversation";
import axios from 'axios';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = UseConversation();

  const SendMessage = async (message) => {
    if (!message.trim() || !selectedConversation?._id) return;
  
    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:2000/message/send/${selectedConversation._id}`,
        { message }, // ✅ wrap string in object
        { withCredentials: true }
      );
      console.log("Message sent:", res.data.messages);
  
      setMessages([...messages, res.data]); // ✅ use newMessage only
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return { loading, SendMessage };
};

export default useSendMessage;
