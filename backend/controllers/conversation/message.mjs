import Message from "../../models/OneToOneMessage.mjs";
import User from "../../models/User.mjs";
import { io } from "../../server.mjs";

export const addMessage = async (req, res) => {
  try {
    console.log(req.body);
    const { conversationId, sender, recipient, message, type, file } = req.body;
    const newMessage = new Message({
      conversationId,
      sender,
      message,
      recipient,
      type,
      file,
    });
    await newMessage.save();
    res.status(200).json({
      message: "Message Sent Successfully",
      data: newMessage,
      status: "success",
    });
  } catch (error) {
    console.error(error);
  }
};

export const getMessages = async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    const messages = await Message.find({
      conversationId: conversationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async (data) => {
  try {
    console.log(data)
    const { conversationId, sender, recipient, message, type, file } = data;
    const newMessage = new Message({
      conversationId,
      sender,
      message,
      recipient,
      type,
      file,
    });
    const savedMessage = await newMessage.save();
    const recipientSocket = await User.findById(recipient);
    console.log(recipientSocket)
    io.to(recipientSocket.socketId).emit("new-message", savedMessage)
    
  } catch (error) {
    console.error(error);
  }
};
