// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../../context/AuthProvider";
// import UseConversation from "../../zustand/UseConversation";
// import  {SocketProvider}  from "../../context/SocketContext";
// import {useSocketContext}  from '../../context/SocketContext';
// const User = () => {
//   const [user, setUser] = useState([]);
//   console.log("all  user :",user);
  
//   const [authUser] = useAuth();
// const {socket ,onlineUsers} = useSocketContext()
//   const { selectedConversation, SetSelectedConversation } = UseConversation();
// // console.log(selectedConversation);  //click user detail
// // const  isOnline = onlineUsers.includes(user._id)
// // console.log(isOnline);    //false

// const onlineUserList = user.filter((u) => onlineUsers.includes(u._id));

// console.log("All users:", user);
// console.log("Online users only:", onlineUserList);
// // console.log("socket and onlineUsers : ",socket,onlineUsers);


//   useEffect(() => {
//     const getUsers = async () => {
//       try {
//         const api = await axios.get("http://localhost:2000/user/alluser", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authUser}`,
//           },
//           withCredentials: true,
//         });
//         // console.log(api.data);
        
//         setUser(api.data);
//       } catch (error) {
//         alert("Session expired! Please login again.");
//         console.error("Error occurred:", error);
//         window.location.href = "/login";
//       }
//     };

//     if (authUser) {
//       getUsers();
//     }
//   }, [authUser]);


  
//   return (
//     <div>
//       {user?.map((u) => {
//         const isSelected = selectedConversation?._id === u._id;
//         // console.log(isSelected);
//         const  isOnline = onlineUsers.includes(user._id)
//         return (
//           <div
//             key={u._id}
//             onClick={() => SetSelectedConversation(u)}
//             className={`flex space-x-4 py-3 px-6 mt-0 cursor-pointer duration-300
//               ${isSelected ? "bg-gray-700" : "hover:bg-gray-800 "}`}
//           >
//             <div className={`avatar ${isOnline?"online":""}`}>

//               <div className="w-14 rounded-full">
//                 <img
//                   src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//                   alt="avatar"
//                 />
//               </div>

//             </div>
//             <div>
//               <h1 className="font-bold">{u.fullname}</h1>
//               <span>{u.email}</span>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default User;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import UseConversation from "../../zustand/UseConversation";
import { useSocketContext } from '../../context/SocketContext';

const User = () => {
  const [user, setUser] = useState([]);
  const [authUser] = useAuth();
  const { socket, onlineUsers } = useSocketContext();
  const { selectedConversation, SetSelectedConversation } = UseConversation();
console.log("users :",user);
console.log(onlineUsers);

 const backendUrl = "https://chatapp-3yzu.onrender.com"
  useEffect(() => {
    const getUsers = async () => {
      try {
        const api = await axios.get(`${backendUrl}/user/alluser`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authUser}`,
          },
          withCredentials: true,
        });

        setUser(api.data);
      } catch (error) {
        alert("Session expired! Please login again.");
        console.error("Error occurred:", error);
        window.location.href = "/login";
      }
    };

    if (authUser) {
      getUsers();
    }
  }, [authUser]);

  return (
    <div>
      {user?.map((u) => {
        const isSelected = selectedConversation?._id === u._id;
        const isOnline = onlineUsers.includes(u._id); // ✅ Corrected here

        return (
          <div
            key={u._id}
            onClick={() => SetSelectedConversation(u)}
            className={`flex space-x-4 py-3 px-6 mt-0 cursor-pointer duration-300
              ${isSelected ? "bg-gray-700" : "hover:bg-gray-800 "}`}
          >
            <div className={`avatar ${isOnline ? "online" : ""}`}>
              <div className="w-14 rounded-full">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt="avatar"
                />
              </div>
            </div>
            <div>
              <h1 className="font-bold">{u.fullname}</h1>
              <span>{u.email}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default User;
