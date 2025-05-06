import User from "../models/user.model.js"; // Adjust the path based on your project structure
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Create a new user
const registerUser = async (req, res) => {
  const { fullname, email, password, confirmpassword } = req.body;

  // Ensure passwords match
  if (password !== confirmpassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      confirmpassword: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

//get all user
// The `allUsers` controller will be executed after the middleware
const allUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id; // Get the logged-in user from `req.user` set by middleware

    // Fetch users from DB, excluding the logged-in user
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password"); // Exclude password from user data

    // Send the filtered list of users back to the client
    res.status(200).json(filteredUsers); // Successful response with the filtered users
  } catch (error) {
    console.log('Error in allUsers Controller:', error);
    res.status(500).json({ error: 'Server error' }); // Send a server error if something goes wrong
  }
};


//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      message: "Please provide both email and password",
    });
  }

  try {
    //find in db
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECREATE, {
      expiresIn: "3h",
    });

    //setcookies token
    // res.cookie("jwt", token, {
    //   httpsOnly: true, // So that you can read it from the frontend
    //   secure: true, // Allow it on non-HTTPS (localhost or development)
    //   sameSite: "lax", // Allow cookie sharing
    // });
    res.cookie("jwt", token, {
      httpOnly: true,      // Corrected spelling: cannot be accessed by JS
      secure: true,        // Required for cross-site on HTTPS
      sameSite: "None",    // Required for cross-site cookies
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    
    // console.log(token)
    if (isPasswordValid) {
      return res.status(200).json({
        message: "Logged in successfully",
        user: user,
        status: true,
        token: token,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid email or password", status: false });
    }
  } catch (error) {
    console.error("Login error:", error); // ✅ log for debugging
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};





// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(401).json({
//       message: "Please provide both email and password",
//     });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res
//         .status(400)
//         .json({ message: "Invalid email or password", status: false });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECREATE, {
//       expiresIn: "3h",
//     });

//     res.cookie("jwt", token, {
//       httpOnly: true,   // ✅ FIXED typo
//       secure: false,    // set true only in production over HTTPS
//       sameSite: "lax",
//     });

//     return res.status(200).json({
//       message: "Logged in successfully",
//       user,
//       status: true,
//       token,
//     });
//   } catch (error) {
//     console.error("Login error:", error); // ✅ log for debugging
//     return res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };















//logout
const logoutUser = async (req, res) => {
  try {
    // res.clearCookie("jwt");

    res.cookie("jwt", "", {
      httpOnly: true,
      secure: false, // Change to `true` in production (if using HTTPS)
      sameSite: "strict",
      expires: new Date(0), // Set expiration to past time
    });
    return res
      .status(200)
      .json({ message: "Logged out successfully", status: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { registerUser, allUsers, loginUser, logoutUser };
