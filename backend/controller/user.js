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
const getUsers = async (req, res) => {
  const allUser = await User.find();
  if (!allUser) {
    res.status(400).json({ message: "User not found" });
  }
  res.status(201).json({ message: "User found", user: allUser });
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
      expiresIn: "1h",
    });

    //setcookies token
    res.cookie("jwt", token, {
      httpsOnly: true, // So that you can read it from the frontend
      secure: true, // Allow it on non-HTTPS (localhost or development)
      sameSite: "lax", // Allow cookie sharing
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
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

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

export { registerUser, getUsers, loginUser, logoutUser };
