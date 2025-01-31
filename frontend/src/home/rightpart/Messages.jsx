import React from "react";
import Message from "../rightpart/Message";

const Messages = () => {
  return (
    <div    className="py-2 flex-1 overflow-y-auto" 
    style={{
      maxHeight: "calc(84vh - 10vh)",
      scrollbarWidth: "none", // For Firefox
      msOverflowStyle: "none", // For IE and Edge
    }}>
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      
     
    </div>
  );
};

export default Messages;
