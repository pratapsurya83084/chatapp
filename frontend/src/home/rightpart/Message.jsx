import React from 'react';

const Message = ({ messages }) => {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = messages.senderId === authUser.user._id;
// console.log(messages);

  const ChatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500" : "";

  return (
    <div className="p-4">
      <div className={`chat text-white ${ChatName}`}>
        <div className={`chat-bubble text-white ${chatColor}`}>
          {messages.message}
        </div>
      </div>
    </div>
  );
};

export default Message;
