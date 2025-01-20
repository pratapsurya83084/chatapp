import express from 'express';
import {registerUser,getUsers,loginUser} from '../controller/user.js';
const router=express.Router();
// register user
router.post("/register",registerUser);

//login user
router.post("/login",loginUser);
//login
router.get("/alluser",getUsers);
export default router;