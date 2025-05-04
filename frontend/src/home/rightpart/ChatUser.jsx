import React from "react";
import UseConversation from "../../zustand/UseConversation";
import {useSocketContext} from '../../context/SocketContext';
const ChatUser = () => {
  //  const [user, setUser] = useState([]);
    // const [authUser] = useAuth();
    const { socket, onlineUsers } = useSocketContext();
const {selectedConversation}=UseConversation()
// console.log(selectedConversation.fullname);
// console.log("selected user:",selectedConversation._id);
// const isOnline = onlineUsers.includes(selectedConversation._id); // ✅ Corrected here
// console.log(isOnline);

  return (
  <div>
    {
      selectedConversation?
      
      (  <div className="flex justify-center gap-5 h-[8vh] bg-slate-800 hover:bg-slate-600 duration-500 py-2 ">
        <div className={`avatar ${onlineUsers.includes(selectedConversation._id)?"online":""} cursor-pointer`}>
          <div className="w-14 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
  
        {/* name and status online or offline */}
        <div>
          <h1 className="text-xl ">{selectedConversation?selectedConversation.fullname:""}</h1>
          <h2 className="text-sm">
            {onlineUsers.includes(selectedConversation._id)?"online":"offline"}
            {/* online */}
            </h2>
        </div>
      </div>
      ):(
        ""
      )
    }
  </div>
  );
};

export default ChatUser;
