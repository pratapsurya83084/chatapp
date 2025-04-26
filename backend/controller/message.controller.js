import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  //write send message logic
  try {
    var { messages } = req.body; //take user message
    var receiverId = req.params.id; // receiverId
    var senderId = req.user._id; //senderId i.e current loggedIn User

    //find both id in conversation model
    //if not find then create a conversation i.e store in db
    var conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    //store senderId ,receiverId , messages
    var newMessage = new Message({
      senderId,
      receiverId,
      messages,
    });

    if (newMessage) {
      conversation.messages.push(newMessage.id);
    }

    await Promise.all([conversation.save(), newMessage.save()]); //run parallaly

    res.status(200).json({
      message: "Message sent Successfully",
      newMessage,
    });
  } catch (error) {
    console.log("error sendMessage : " + error);

    res.status(500).json({
      error: "internal server error",
    });
  }
};










export const getAllMessage = async (req, res) => {
  try {
    const chatUserId = req.params.id; // receiverId from params
    const senderId = req.user._id; // senderId from authenticated user
    console.log(senderId);

    // Find conversation between two users
    const conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUserId] },
    }).populate("messages");  //messages id
console.log(conversation);

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found.",
        messages: [],
      });
    }

    const messages = conversation.messages;  //  messages is 

    return res.status(200).json({
      message: "Messages fetched successfully.",
      messages,
    });
  } catch (error) {
    console.error("Error occurred while fetching messages:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
