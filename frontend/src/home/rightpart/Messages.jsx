import React from "react";
import Message from "../rightpart/Message.jsx";
import useGetMessage from "../../context/useGetMessage.jsx";
import Loading from '../../component/Loading.jsx';
const Messages = () => {
  const {loading,messages}=useGetMessage();
 
  // console.log(loading);
  // console.log(messages);
  
  
  return (
    <div    className="py-2 flex-1 overflow-y-auto" 
    style={{
      maxHeight: "calc(84vh - 10vh)",
      scrollbarWidth: "none", // For Firefox
      msOverflowStyle: "none", // For IE and Edge
    }}>
      
{loading?(<Loading/>):(messages.length>0 && messages.map((message)=>(
    <Message key={message._id} message={message} />
   
    
    )))}


{!loading && messages.length ==0 &&(
  <div className="mt-[20%] text-center items-center  h-screen "> <p>Say Hi! to start the Conversation</p> </div>
)}
      
      
     
    </div>
  );
};

export default Messages;
