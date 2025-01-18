import React from 'react'

const User = () => {
  return (
    <div className=''>
      <div className="flex space-x-4 py-3 px-6 hover:bg-gray-800 mt-0 duration-300 cursor-pointer ">
        <div className="avatar online">
          <div className="w-14 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div>
          <h1 className='font-bold'>aman</h1>
          <span>xyz@gmail.com</span>
        </div>
      </div>
    </div>
  )
}

export default User
