import useGetMessage from "../../context/useGetMessage";
import Loading from "../../component/Loading.jsx";
import UseConversation from "../../zustand/UseConversation";
import Message from "../rightpart/Message.jsx";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
// import { useRef } from "react";
const Messages = () => {
  const { messages } = useGetMessage();
  const { selectedConversation, setMessages } = UseConversation();
  const [loading, setLoading] = useState(false);

  const lastMessageRef = useRef();

  useEffect(() => {
    const scrollToLastMessage = () => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Wait until DOM is painted
    setTimeout(scrollToLastMessage, 100);
  }, [messages]);

  return (
    <div
      className="py-2 flex-1 overflow-y-auto"
      style={{
        maxHeight: "calc(84vh - 10vh)",
        scrollbarWidth: "none", // For Firefox
        msOverflowStyle: "none", // For IE and Edge
      }}
    >
      {loading ? (
        <Loading />
      ) : messages && messages.length > 0 ? (
        messages.map((message,index) => (
          <div key={message._id}   ref={index === messages.length - 1 ? lastMessageRef : null}>
            <Message messages={message}  />
          </div>
        ))
      ) : (
        <div className="mt-[20%] text-center items-center h-screen text-slate-500">
          <h1>
            welcome{" "}
            <span className="text-bold text-xl text-slate-400">
              {" "}
              {JSON.parse(localStorage.getItem("ChatApp")).user.fullname}{" "}
            </span>
          </h1>
          <p>
            No chat! selected . please start by selecting anyone to your
            contacts
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;
