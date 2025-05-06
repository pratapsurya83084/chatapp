import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import UseConversation from "../../zustand/UseConversation";
import useSendMessage from "../../context/useSendMessage";
import axios from "axios";

const TypeMessage = () => {
  const [message, setMessage] = useState("");
  const { loading, SendMessage } = useSendMessage();
  const { selectedConversation, setMessages, messages } = UseConversation();
 const backendUrl = "https://chatapp-3yzu.onrender.com"
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim() || !selectedConversation?._id) return;

    // Send the message and update the UI immediately
    await SendMessage(message);

    // Create a new message object (simulate the response you expect from the backend)
    const newMessage = {
      _id: Date.now(),
      senderId: selectedConversation._id,
      message: message,
    };

    setMessages([newMessage, ...messages]);

    setMessage("");

   // Fetch updated messages from the backend  again call getmessage for update all message without reloading
    try {
      const res = await axios.get(
        `${backendUrl}/message/getmessage/${selectedConversation._id}`,
        { withCredentials: true }
      );
      setMessages(res.data.messages); // Update messages with the latest fetched data
    } catch (error) {
      console.error("Error fetching messages after sending:", error);
    }
  };

  return (
   <div>

    {
      selectedConversation?( <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 px-6 h-[8vh] bg-slate-800">
          <div className="flex-1">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Type your message"
              className="border border-gray-700 rounded-lg p-2 outline-none w-full"
            />
          </div>
          <button
            type="submit"
            className="text-blue-500 hover:text-blue-700"
            disabled={loading}
          >
            <IoSend size={24} />
          </button>
        </div>
      </form>):

      ("")
    }
   </div>
  );
};

export default TypeMessage;
