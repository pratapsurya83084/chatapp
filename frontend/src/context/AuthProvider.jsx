import React, { createContext, useContext, useState ,useEffect} from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Read from cookies (must be non-httpOnly) or localStorage
  const initialUserState = Cookies.get('jwt') || localStorage.getItem("ChatApp");

  console.log("Auth Cookie/Storage value: ", initialUserState);

  const [authUser, SetAuthUser] = useState(initialUserState || undefined);
  
  return (
    <AuthContext.Provider value={[authUser, SetAuthUser]}>
      {children} 
    </AuthContext.Provider>
  );
};
  
export const useAuth = () => useContext(AuthContext);
