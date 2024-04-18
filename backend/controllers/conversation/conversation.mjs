import Conversation from "../../models/Conversation.mjs";

export const addConversation = async (req, res) => {
  try {
    const { senderId, recieverId } = req.body;
    const newConversation = new Conversation({
      members: [senderId, recieverId],
    });
    await newConversation.save();
    res.status(201).json(newConversation);
  } catch (error) {
    console.log(error);
  }
};
export const getConversation = async (req, res) => {
  try {
    const userId = req.params.id;
    const conversation = await Conversation.find({
      members: { $in: [userId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    console.log(error);
  }
};
