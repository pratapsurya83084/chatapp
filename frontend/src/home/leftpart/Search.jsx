import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
const Search = () => {
  const [messages ,setMessage]=useState("");


  return (
    <div className=" h-[10vh]">
    <div className="px-6 py-4">
      <form >
        <div className="flex space-x-3">
          <label className=" border-[1px] border-gray-700 bg-slate-900 rounded-lg p-3 flex items-center gap-2 w-[80%]">
            <input        
              type="text"
              className="grow outline-none bg-transparent"
              placeholder="Search"
        
          
            />
          </label>
          <button>
            <FaSearch className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300" />
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default Search;
