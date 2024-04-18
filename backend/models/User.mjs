import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    profilePic: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    socketId: { type: String },
    lastSeen: { type: String },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: false, unique: true },
    password: { type: String, required: true },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
