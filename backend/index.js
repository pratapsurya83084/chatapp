import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
//import all route
import userRouter from './route/user.js';

const app = express();
// Middleware to parse JSON
app.use(express.json());
dotenv.config();



app.listen(process.env.PORT, () => {
  console.log(`server is runnig on port:${process.env.PORT}`);
});

//All route 
app.use('/user',userRouter);




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
