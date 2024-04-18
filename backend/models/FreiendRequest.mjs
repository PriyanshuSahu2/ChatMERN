import mongoose from "mongoose";

const FriendRequestSchema = new mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const FriendRequest = mongoose.model("FriendRequest", FriendRequestSchema);
export default FriendRequest;
