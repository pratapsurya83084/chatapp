import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider'
const User = () => {
  const [user, setUser] = useState([]);
  // console.log(user);
  
  const [authUser] = useAuth();
  // console.log("get jwt : ", authUser);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const api = await axios.get("http://localhost:2000/user/alluser", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authUser}`,  
          },
          withCredentials: true,
        });
        console.log("Fetched once:", api.data);  
        setUser(api.data);
      
      } catch (error) {
        alert("session expired ! please login please.")
        console.log("Error occurred:", error);
       window.location.href="/login"

      }
    };
  
    if (authUser) {  
      getUsers();
    }
  }, [authUser]); 


  return (
    <div>
      {user?.map((user, index) => (
        <div key={index} className="flex space-x-4 py-3 px-6 hover:bg-gray-800 mt-0 duration-300 cursor-pointer">
          <div className="avatar online">
            <div className="w-14 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div>
            <h1 className='font-bold'>{user.fullname}</h1>
            <span>{user.email}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default User;
