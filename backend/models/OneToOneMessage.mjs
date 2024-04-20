import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type:{
      type:String,
      enum:["Text","Document","Media"]
    },
    message: {
      type: String,
    },
    file:{
      type:String, 
    }
  },
  { timestamps: true }
);

const Message = mongoose.model("OneToOneMessage", MessageSchema);
export default Message;
