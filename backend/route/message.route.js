import express from 'express';
import {sendMessage}  from '../controller/message.controller.js'
import {getAllMessage}  from '../controller/message.controller.js'
import auth from '../middleware/authGetUsers.js' 
const router=express.Router();



router.post("/send/:id",auth,sendMessage);
router.get("/getmessage/:id",auth,getAllMessage);

export default router;