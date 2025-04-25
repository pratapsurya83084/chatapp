import express from 'express';
import {registerUser,allUsers,loginUser,logoutUser } from '../controller/user.js';
import auth from '../middleware/authGetUsers.js'
const router=express.Router();
// register user
router.post("/register",registerUser);

//login user
router.post("/login",loginUser);

router.get("/alluser",auth,allUsers);

//logout user
router.post("/logout",logoutUser);


export default router;