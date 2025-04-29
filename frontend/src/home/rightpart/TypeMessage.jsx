import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import UseConversation from "../../zustand/UseConversation";
import useSendMessage from "../../context/useSendMessage";

const TypeMessage = () => {
  const [message, setMessage] = useState("");
  const { loading, SendMessage } = useSendMessage();
  const { selectedConversation } = UseConversation(); // Needed to know whom to send to

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) return; // prevent empty messages

    if (selectedConversation?._id) {
      await SendMessage(message); // send to backend
      setMessage(""); // clear input after send
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-2 px-6 h-[8vh] bg-slate-800">
        {/* Input Field */}
        <div className="flex-1">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Type your message"
            className="border border-gray-700 rounded-lg p-2 outline-none w-full"
          />
        </div>

        {/* Send Button */}
        <button type="submit" className="text-blue-500 hover:text-blue-700" disabled={loading}>
          <IoSend size={24} />
        </button>
      </div>
    </form>
  );
};

export default TypeMessage;
