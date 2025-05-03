

import useGetMessage from "../../context/useGetMessage";
import Loading from '../../component/Loading.jsx';
import UseConversation from "../../zustand/UseConversation";
import Message from "../rightpart/Message.jsx";
import React,{useEffect,useState} from "react";
import axios from "axios";
const Messages = () => {
  const {  messages } = useGetMessage();
  const { selectedConversation, setMessages } = UseConversation();
   const [loading, setLoading] = useState(false);
console.log(messages);


async function apiGetmessage(){
  setLoading(true);
      // Clear previous messages before new fetch
      setMessages([]); //very imp  if not use then same message shows other user chat

      if (selectedConversation && selectedConversation._id) {
        try {
          const res = await axios.get(
            `http://localhost:2000/message/getmessage/${selectedConversation._id}`,
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
}


useEffect(()=>{
apiGetmessage();
},[]);

  return (
    <div    className="py-2 flex-1 overflow-y-auto" 
    style={{
      maxHeight: "calc(84vh - 10vh)",
      scrollbarWidth: "none", // For Firefox
      msOverflowStyle: "none", // For IE and Edge
    }}>
      
      {loading ? (
  <Loading />
) : messages && messages.length > 0 ? (
  messages.map((message) => (
    <Message key={message._id} messages={message} />
  ))
) : (
  <div className="mt-[20%] text-center items-center h-screen">
    <p>Say Hi! to start the Conversation</p>
  </div>
)}


{/* {loading?(<Loading/>):(messages
  .filter((msg) => msg && msg._id)
  .map((message) => (
    <Message key={message._id} message={message} />
  ))
)
     } */}



{/* {!loading && messages.length ==0 &&(
  <div className="mt-[20%] text-center items-center  h-screen "> <p>Say Hi! to start the Conversation</p> </div>
)}
       */}
      
     
    </div>
  );
};

export default Messages;
