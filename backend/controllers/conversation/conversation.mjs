import Conversation from "../../models/Conversation.mjs";
import QueueMessage from "../../models/QueueMessage.mjs";

export const addConversation = async (req, res, next) => {
  try {
    const { sender, recipient } = req.body;
    const newConversation = new Conversation({
      members: [sender, recipient],
    });
    const savedConversation = await newConversation.save();
    res.status(201).json(savedConversation);
  } catch (error) {
    next(error);
  }
};
export const getConversation = async (req, res) => {
  try {
    const userId = req.params.userId;

    const conversation = await Conversation.find({
      members: { $in: [userId] },
    }).populate("members");

    let queuedMessages = await QueueMessage.find({ recipient: userId });

  
    conversation.unread = queuedMessages.length;
    if (conversation.length != 0) {
      conversation.lastmessage = queuedMessages[conversation.length - 1];
    }
   

    res.status(200).json(conversation);
  } catch (error) {
    console.error(error);
  }
};
