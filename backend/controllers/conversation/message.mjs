import Message from "../../models/OneToOneMessage.mjs";
import User from "../../models/User.mjs";
import { io } from "../../server.mjs";

export const addMessage = async (req, res) => {
  try {
    const { conversationId, sender, recipient, message, type, file } = req.body;
    if(!conversationId){
      throw new Error("SJSJJS")
    }
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
    const messages = await Message.find({ conversationId: conversationId })
      .populate({
        path: "sender",
        select: "_id profile firstName lastName",
      })
      .populate({
        path: "recipient",
        select: "_id profile firstName lastName",
      });

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
  }
};

export const sendMessage = async (data) => {
  try {
    const { conversationId, sender, recipient, message, type, file } = data;
    console.log(`ConersationId:${conversationId}`);
    const newMessage = new Message({
      conversationId,
      sender,
      message,
      recipient,
      type,
      file,
    });
    const savedMessage = await newMessage.save();
    console.log(savedMessage);
    const recipientSocket = await User.findById(recipient);
     io.to(recipientSocket.socketId).emit("new-message", savedMessage);
  } catch (error) {
    console.error(error);
  }
};
