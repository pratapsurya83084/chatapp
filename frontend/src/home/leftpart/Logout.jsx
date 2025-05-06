import React, { useState } from "react";
import axios from "axios";
import { BiLogOutCircle } from "react-icons/bi";

const Logout = () => {
  const [logout,setLogout]=useState("logout")
  const backendUrl = "https://chatapp-4-ca16.onrender.com"
  const log = async () => {
    const logoutUser = await axios.post(
      `${backendUrl}/user/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    console.log(logoutUser.data);
    localStorage.removeItem("ChatApp");
    // navigate('/login');
    window.location.href = "/login";
  };

  return (
    <button
  onClick={log}
  className="flex items-center gap-2 text-white px-4 py-2 rounded group relative"
>
  <BiLogOutCircle size={24} />
  <span className="absolute left-full ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    Logout
  </span>
</button>
  );
};

export default Logout;
