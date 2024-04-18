import Message from "../../models/Message.mjs";

export const addMessage = async (req, res) => {
  try {
    const { conversationId, sender, message } = req.body;
    const newMessage = new Message({ conversationId, sender, message });
    await newMessage.save();
    res.status(200).json({ message: "Message Sent Successfully" });
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
