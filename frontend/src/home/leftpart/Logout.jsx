import React from "react";
import { BiLogOutCircle } from "react-icons/bi";

const Logout = () => {
  return (
    <button className="flex items-center gap-2  text-white px-4 py-2 rounded ">
      <BiLogOutCircle size={24} /> {/* Sets the size of the icon */}
      {/* <span>Logout</span> */}
    </button>
  );
};

export default Logout;
