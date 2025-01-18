import React from 'react'
import Search from '../leftpart/Search';
import Logout from '../leftpart/Logout';
import Users from '../leftpart/Users';
const Left = () => {
  return (
    <div className='w-[30%]   bg-black text-gray-400'>
      <Search/>
      <Users/>
      <Logout/>
   

    </div>
  )
}

export default Left
