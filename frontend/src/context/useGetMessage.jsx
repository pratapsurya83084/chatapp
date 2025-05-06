import React, { useEffect, useState } from "react";
import UseConversation from "../zustand/UseConversation.js";
import axios from "axios";
const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = UseConversation();
// console.log(messages);

useEffect(() => {
    const getMessage = async () => {
      setLoading(true);
      // Clear previous messages 
      setMessages([]); //very imp  if not use then same message shows other user chat
const backendUrl = "https://chatapp-4-ca16.onrender.com"
      if (selectedConversation && selectedConversation._id) {
        try {
          const res = await axios.get(
            `${backendUrl}/message/getmessage/${selectedConversation._id}`,
            {
              withCredentials: true,
            }
          );

          // console.log(res.data);

          setMessages(res.data.messages);

        } catch (error) {
          console.log("Error in getting message :", error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    getMessage();

  }, [selectedConversation, setMessages]);

  return { loading, messages };
};

export default useGetMessage;

