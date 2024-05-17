import { isUserOnline } from "../../misc/utils.mjs";
import Conversation from "../../models/Conversation.mjs";
import Message from "../../models/OneToOneMessage.mjs";
import QueueMessage from "../../models/QueueMessage.mjs";
import User from "../../models/User.mjs";
import { io } from "../../server.mjs";

export const addMessage = async (req, res) => {
  try {
    const { conversationId, sender, recipient, message, type, file } = req.body;
    let newMessage = null;
    if (isUserOnline(recipient)) {
      newMessage = new QueueMessage({
        conversationId,
        sender,
        message,
        recipient,
        type,
        file,
        status: "Recieved",
      });
    } else {
      newMessage = new QueueMessage({
        conversationId,
        sender,
        message,
        recipient,
        type,
        file,
        status: "Sent",
      });
    }

    const savedMessage = await newMessage.save();
    const updatedConversation = await Conversation.findOneAndUpdate(
      { _id: conversationId }, // Match conversation by _id
      {
        $set: { lastmessage: savedMessage },
      },
      { new: true } // Options: return updated document after update
    );

    const senderSokcet = await User.findById(sender).select(
      "_id profile socketId"
    );
    const recipientSocket = await User.findById(recipient).select(
      "_id profile socketId"
    );
    savedMessage.sender = senderSokcet;
    savedMessage.recipient = recipientSocket;
    io.to(recipientSocket.socketId).emit("new-message", savedMessage);
    res.status(200).json({
      message: "Message Sent Successfully",
      data: savedMessage,
      status: "success",
    });
  } catch (error) {
    console.error(error);
  }
};

export const getMessages = async (req, res) => {
  try {
    const { conversationId, userId } = req.params;

    // Retrieve queued messages for the user
    const queuedMessages = await QueueMessage.find({ recipient: userId });

    // Process queued messages asynchronously
    await processQueuedMessages(queuedMessages);

    // Retrieve persisted messages for the conversation ID
    const persistedMessages = await Message.find({ conversationId })
      .populate({
        path: "sender recipient",
        select: "_id profile firstName lastName",
      })
      .sort({ createdAt: 1 });

    // Combine persisted and queued messages
    const allMessages = [...persistedMessages, ...queuedMessages];

    // Group messages by date
    const groupedMessages = groupMessagesByDate(allMessages);

    res.status(200).json(groupedMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Process queued messages asynchronously
const processQueuedMessages = async (queuedMessages) => {
  await Promise.all(
    queuedMessages.map(async (queuedMessage) => {
      try {
        // Update status to "Seen"
        queuedMessage.status = "Seen";

        // Create a new message without the _id field
        const messageWithoutId = createMessageWithoutId(queuedMessage);

        // Save queued message as a new message in the database
        await Message.create(messageWithoutId);

        // Delete queued message from the queue
        await QueueMessage.findByIdAndDelete(queuedMessage._id);
      } catch (error) {
        console.error("Error processing queued message:", error);
      }
    })
  );
};

// Create a new message without the _id field
const createMessageWithoutId = (queuedMessage) => ({
  conversationId: queuedMessage.conversationId,
  sender: queuedMessage.sender,
  recipient: queuedMessage.recipient,
  type: queuedMessage.type,
  message: queuedMessage.message,
  status: "Seen",
  createdAt: queuedMessage.createdAt,
  updatedAt: queuedMessage.updatedAt,
  __v: queuedMessage.__v,
});

// Group messages by date
const groupMessagesByDate = (messages) => {
  const groupedMessages = {};
  messages.forEach((message) => {
    const date = new Date(message.createdAt).toLocaleDateString("en-GB");
    groupedMessages[date] = groupedMessages[date] || [];
    groupedMessages[date].push(message);
  });
  return groupedMessages;
};

export const sendMessage = async (data) => {
  try {
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

    const senderSokcet = await User.findById(sender).select(
      "_id socketId firstName"
    );
    const recipientSocket = await User.findById(recipient);
    io.to(senderSokcet.socketId).emit("status", { status: "Sent" });
    io.to(recipientSocket.socketId).emit("new-message", savedMessage);
  } catch (error) {
    console.error(error);
  }
};
