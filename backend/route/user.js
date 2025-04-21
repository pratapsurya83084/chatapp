import express from 'express';
import {registerUser,getUsers,loginUser,logoutUser } from '../controller/user.js';
import auth from '../middleware/authGetUsers.js'
const router=express.Router();
// register user
router.post("/register",registerUser);

//login user
router.post("/login",loginUser);
//login
router.get("/alluser",auth,getUsers);

//logout user
router.post("/logout",logoutUser);


export default router;