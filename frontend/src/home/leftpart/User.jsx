import React, { useEffect, useState } from 'react';
import axios from 'axios';

const User = () => {
  const [user, setUser] = useState([]);

  async function users() {
    try {
      const api = await axios.get("http://localhost:2000/user/alluser", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(api.data);  // This should print only once
      setUser(api.data.user);  // Ensure that this is the correct path to your user data
    } catch (error) {
      console.log("Error occurred, not found:", error);
    }
  }

  useEffect(() => {
    users(); // Call the API only once when the component mounts
  }, []); // Empty dependency array ensures it only runs once on mount

  return (
    <div className=''>
      {user.map((user, index) => {
        return (
          <div key={index} className="flex space-x-4 py-3 px-6 hover:bg-gray-800 mt-0 duration-300 cursor-pointer ">
            <div className="avatar online">
              <div className="w-14 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div>
              <h1 className='font-bold'>{user.fullname}</h1>
              <span>xyz@gmail.com</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default User;
