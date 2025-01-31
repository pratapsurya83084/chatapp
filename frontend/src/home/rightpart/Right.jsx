import React from "react";
import ChatUser from "./ChatUser"; 
import Messages from "./Messages";
import TypeMessage from "./TypeMessage";
const Right = () => {
  return <div className="w-[70%]  bg-slate-900 text-gray-300">
  <ChatUser/>
  <div 
  className=" " style={{minHeight:"calc(92vh - 8vh)"}} >
  <Messages/>
  </div>

    <TypeMessage/>
    </div>;
};

export default Right;
