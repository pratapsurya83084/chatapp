import React, { useContext, useState } from 'react'
import { createContext } from 'react'
import Cookies from 'js-cookie';
const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  console.log(localStorage.getItem("ChatApp"));

 //cookies =  It provides a simpler way to set, get, and remove cookies compared to using document.cookie.
   const initialUserState=Cookies.get("jwt") ||localStorage.getItem("ChatApp")  
  //parse the user data and store  in state
  const [authUser,SetAuthUser]=useState(initialUserState?JSON.parse(initialUserState): undefined)
   return (
    <AuthContext.Provider value={{authUser,SetAuthUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth=()=>useContext(AuthProvider)
