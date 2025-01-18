import React from "react";
import { IoSend } from "react-icons/io5";

const TypeMessage = () => {
  return (
    <div className="flex items-center gap-2 px-6 h-[8vh] bg-slate-800">
      {/* Input Field */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Type here message"
          className="border border-gray-700 rounded-lg p-2  outline-none w-full"
        />
      </div>

      {/* Send Button */}
      <button className="text-blue-500 hover:text-blue-700">
        <IoSend size={24} /> {/* Increased icon size */}
      </button>
    </div>
  );
};

export default TypeMessage;
