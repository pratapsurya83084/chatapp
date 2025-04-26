
import User from '../models/user.model.js'
import mongoose from "mongoose";
import Message from '../models/message.model.js'
const  conversationSchema =new mongoose.Schema({
    members:[{
        type :mongoose.Schema.Types.ObjectId,
        ref:User
    }],
    messages:[{
        type :mongoose.Schema.Types.ObjectId,
        ref:Message,
        default:[]
    }]
},{timestamps:true})

  const Conversation = mongoose.model("Conversation",conversationSchema);

  export default Conversation;