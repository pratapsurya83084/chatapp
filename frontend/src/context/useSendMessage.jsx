import { useState } from "react";
import axios from "axios";
import UseConversation from "../zustand/UseConversation";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = UseConversation();

  const SendMessage = async (message) => {
    if (!message.trim() || !selectedConversation?._id) return;
const backendUrl = "https://chatapp-4-ca16.onrender.com"
    setLoading(true);
    try {
      const res = await axios.post(
        `${backendUrl}/message/send/${selectedConversation._id}`,
        { message },
        { withCredentials: true }
      );

      // if (res.data && res.data.messages) {
      //   console.log("Message sent:", res.data.messages); // This should contain the updated messages
        setMessages(res.data.messages); // Update the messages with the response data
      // } else {
      //   console.error("No messages returned from server.");
      // }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, SendMessage };
};

export default useSendMessage;
