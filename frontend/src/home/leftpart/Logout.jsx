import React from "react";
import axios from "axios";
import { BiLogOutCircle } from "react-icons/bi";

const Logout = () => {
  const log = async () => {
    const logoutUser = await axios.post(
      "http://localhost:2000/user/logout",
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
      className="flex items-center gap-2  text-white px-4 py-2 rounded "
    >
      <BiLogOutCircle size={24} /> {/* Sets the size of the icon */}
      {/* <span>Logout</span> */}
    </button>
  );
};

export default Logout;
