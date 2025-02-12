import { useState } from 'react';
import Left from './home/leftpart/Left'
import Right from './home/rightpart/Right'
import Signup from './component/Signup';
import Login from './component/Login';
import { useAuth } from './context/AuthProvider';
function App() {
 
  const {authUser,SetAuthUser}=useAuth;
  console.log("get jwt : ",authUser);
  
  return (
 
  //  <div className='flex flex-row h-screen'>
  //  <Left/>
  //  <Right/>
  //   </div>
  <Signup/>
  // <Login/>
  )
}

export default App
