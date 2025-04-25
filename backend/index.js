import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import cors from 'cors';
//import all route
import userRouter from './route/user.js';
import messageRouter from './route/message.route.js';


const app = express();
//allow this frontend path or url
app.use(cookieParser());
app.use(cors(
  {
    origin: ["http://localhost:5173"],
    credentials: true   ////must be require when want to set cookie or token
  }
))
// Middleware to parse JSON
app.use(express.json());
dotenv.config();



app.listen(process.env.PORT, () => {
  console.log(`server is runnig on port:${process.env.PORT}`);
});

//All route 
app.use('/user',userRouter);
app.use('/message',messageRouter);




// dbconnection code below...
try {
  const db_name = "chatApp";
  const db_connect = mongoose.connect(
    `${process.env.DB_CONNECT_URL}+${db_name}+${process.env.PORT}`
  );

  if (db_connect) {
    console.log("..............DB CONNECTED SUCCESSFULLY..........");
  } else {
    console.log("Failed db connnection please try again....!");
  }
} catch (error) {
  console.log("Something Went Wrong ...", error);
}
