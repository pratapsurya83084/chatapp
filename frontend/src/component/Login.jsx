import React from 'react'
import { useForm } from "react-hook-form"
const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen  p-4  ">
      <div className="w-full max-w-md  p-6 rounded border border-gray-400 ">
        <h1 className="text-2xl font-bold text-center ">chat App</h1>
        <h2 className="text-lg font-semibold text-center text-gray-500 mt-2">Login</h2>
        <form className="mt-6 space-y-4">
       
          {/* Email */}
          <label className="input input-bordered flex items-center gap-2 p-3 border rounded-lg shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 opacity-70">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="email" className="grow outline-none" placeholder="Email"{...register("email", { required: true })} />
          </label>

          {/* Password */}
          <label className="input input-bordered flex items-center gap-2 p-3 border rounded-lg shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 opacity-70">
              <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
            </svg>
            <input type="password" className="grow outline-none" placeholder="Password" {...register("password", { required: true })}/>
          </label>

          {/* Submit Button */}
         <div className='flex flex-row justify-between text-sm '>
          <p>if you have not account? <span>Signup</span> </p>
         <button className="w-[70px] bg-green-900 text-white py-2 rounded-lg shadow-md  transition duration-300">
            Login
          </button>
         </div>
        </form>
      </div>
    </div>
  )
}

export default Login
