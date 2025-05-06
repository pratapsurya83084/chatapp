import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const backendUrl = "https://chatapp-4-ca16.onrender.com"
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data); // Handle form submission (send to backend)

    try {
      // Call API
      const api = await axios.post(`${backendUrl}/user/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, //must be required for set cooies in broweser
      });

      console.log(api.data);
      localStorage.setItem("ChatApp",JSON.stringify(api.data));

      if (api.data) {
        alert("User Login successfully");
        // localStorage.setItem("ChatApp", JSON.stringify(api.data)); // Store data properly
        // navigate("/");
        window.location.href="/";
      }
    } catch (error) {
      if (error.response) {
        // Check if API response has a message or error field
        const errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          "Something went wrong!";
        alert("Error: " + errorMessage);
      } else if (error.request) {
        // Request was made but no response was received
        alert("Error: No response from server. Please check your network.");
      } else {
        // Other errors (e.g., setting up the request)
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-6 rounded border border-gray-400">
        <h1 className="text-2xl font-bold text-center">Chat App</h1>
        <h2 className="text-lg font-semibold text-center text-gray-500 mt-2">
          Login
        </h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <label className="input input-bordered flex items-center gap-2 p-3 border rounded-lg shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              className="grow outline-none"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                // pattern: {
                //   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                //   message: "Enter a valid email",
                // },
              })}
            />
          </label>
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}

          {/* Password */}
          <label className="input input-bordered flex items-center gap-2 p-3 border rounded-lg shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow outline-none"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
            />
          </label>
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}

          {/* Submit Button */}
          <div className="flex flex-row justify-between text-sm">
            <p>
              If you don't have an account?{" "}
              <span className="text-blue-600 cursor-pointer">
                {" "}
                <Link to="/signup">Signup</Link>{" "}
              </span>
            </p>
            <button
              type="submit"
              className="w-[70px] bg-green-900 text-white py-2 rounded-lg shadow-md transition duration-300 hover:bg-green-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
