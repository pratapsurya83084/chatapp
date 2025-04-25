import React from "react";
import Search from "../leftpart/Search";
import Logout from "../leftpart/Logout";
import Users from "../leftpart/Users";
const Left = () => {
  return (
    <div className="w-[30%]   bg-black text-gray-400">
      <Search />

      <div className="flex flex-col max-h-screen justify- p-4"style={{minHeight:"calc(92vh - 8vh)"}}>
        <Users />

        <div className="mt-auto ">
          <Logout /> 
        </div>
      </div>
    </div>

    
  );
};

export default Left;
