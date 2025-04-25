import express from 'express';
import sendMessage  from '../controller/message.controller.js'
const router=express.Router();



router.get("/send",sendMessage);

export default router;