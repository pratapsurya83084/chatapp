import React from 'react';

const Message = ({ messages }) => {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));



  const itsMe = messages?.senderId === authUser?.user._id;
// console.log(messages);

  const ChatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500" : "";

 let timeString = '';
if (messages.createdAt) {
  const date = new Date(messages.createdAt);
  if (!isNaN(date)) {
    timeString = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      // second: '2-digit',
    });
  }
}


  return (
    <div className="p-4">
      <div className={`flex flex-col chat text-white ${ChatName}`}>
        <div className={`chat-bubble text-white ${chatColor}`}>
          {messages.message}
          
        </div>  
        {timeString}
      </div>
    </div>
  );
};

export default Message;
