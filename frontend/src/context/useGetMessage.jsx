import React, { useEffect, useState } from "react";
import UseConversation from "../zustand/UseConversation.js";
import axios from 'axios';
const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const {messages, setMessages, selectedConversation}=UseConversation();

  useEffect(() => {
    const getMessage = async () => {
      setLoading(true);
    if (selectedConversation && selectedConversation._id) {
        try {
            const res = await axios.get(`http://localhost:2000/message/getmessage/${selectedConversation._id}`,{
                withCredentials:true
            });
            console.log(res.data);
          } catch (error) {
            console.log("Error in getting message :", error);
        setLoading(false);  
        }
    }
    };

    getMessage();
  }, [selectedConversation,setMessages]);

  return {loading,messages};
};

export default useGetMessage;
