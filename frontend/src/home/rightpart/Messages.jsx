import React from "react";
import Message from "../rightpart/Message";
import useGetMessage from "../../context/useGetMessage";

const Messages = () => {
  const {loading,messages}=useGetMessage();
  console.log(messages);
  
  return (
    <div    className="py-2 flex-1 overflow-y-auto" 
    style={{
      maxHeight: "calc(84vh - 10vh)",
      scrollbarWidth: "none", // For Firefox
      msOverflowStyle: "none", // For IE and Edge
    }}>



{!loading && messages.length ==0 &&(
  <div> <p>Say Hi! to start the Conversation</p> </div>
)}
      
      
     
    </div>
  );
};

export default Messages;
