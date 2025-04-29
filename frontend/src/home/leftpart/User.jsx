import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import UseConversation from "../../zustand/UseConversation";

const User = () => {
  const [user, setUser] = useState([]);
  const [authUser] = useAuth();

  const { selectedConversation, SetSelectedConversation } = UseConversation();
// console.log(selectedConversation);  //click user detail

  useEffect(() => {
    const getUsers = async () => {
      try {
        const api = await axios.get("http://localhost:2000/user/alluser", {
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
        // console.log(isSelected);
        
        return (
          <div
            key={u._id}
            onClick={() => SetSelectedConversation(u)}
            className={`flex space-x-4 py-3 px-6 mt-0 cursor-pointer duration-300
              ${isSelected ? "bg-gray-700" : "hover:bg-gray-800 "}`}
          >
            <div className="avatar online">
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
