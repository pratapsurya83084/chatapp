import React from 'react'

const Message = ({message}) => {

  const authUser =JSON.parse(localStorage.getItem("ChatApp"));
  // console.log(authUser.user._id);
  // console.log(Message.senderId);
  
  const itsMe = message.senderId === authUser.user._id;
  console.log("senderid :",message.senderId); console.log("senderId:",authUser.user._id);
  
  console.log(message);
  
  console.log(itsMe);//if true then 
  
  const ChatName = itsMe?"chat-end":"chat-start";
  const chatColor = itsMe?"bg-blue-500":" ";

  return (
    <div>
       <div className=" p-4">
        <div className={`chat text-white ${ChatName} `}>
          <div className={`chat-bubble text-white ${chatColor}`}>
            {message.message}
          </div>
        </div>
      
      </div>
    </div>
  )
}

export default Message
