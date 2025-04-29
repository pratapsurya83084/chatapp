import { create } from 'zustand'

const UseConversation = create((set) => ({
    selectedConversation: null,  //selected username or details
    SetSelectedConversation: (selectedConversation) =>set({ selectedConversation }),
    messages: [],     //store user sended messages
    setMessages: (messages) => set({ messages }),
  }));

export default UseConversation;


  