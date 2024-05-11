import Conversation from "../../models/Conversation.mjs";
import FriendRequest from "../../models/FreiendRequest.mjs";
import User from "../../models/User.mjs";
import { io } from "../../server.mjs";
import { findUserByEmailOrUserName } from "../auth/login.mjs";

export const sendFriendRequest = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { recipient } = req.body;
    const recipientAcc = await findUserByEmailOrUserName(recipient);
    const friendRequst = new FriendRequest({
      sender: userId,
      recipient: recipientAcc._id,
    });
    const newFriendReq = await friendRequst.save();
    res.status(201).json({
      status: "success",
      data: newFriendReq,
      message: "Friend Request Sent Successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const getFriendRequest = async (req, res, next) => {
  try {
    const userId = req.user.id;
  
    const friendRequests = await FriendRequest.find({
      recipient: userId,
    }).populate("sender", "_id firstName lastName email username createdAt");
    res.status(200).json({
      status: "success",
      data: friendRequests,
      message: "Request Fetched Successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const rejectFriendRequest = async (req, res, next) => {
  try {
    const friendRequestId = req.params.requestId;
    await FriendRequest.findByIdAndDelete(friendRequestId);
    res
      .status(204)
      .send({ status: "success", message: "Friend Request Rejected" });
  } catch (error) {
    next(error);
  }
};

export const acceptFriendRequest = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { sender } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { friends: sender },
      },
      { new: true }
    );

    res.status(201).json({
      message: "success",
      data: user.friends,
      message: "Friend Request Accepted",
    });
  } catch (error) {
    next(error);
  }
};

export const AcceptFriendRequest = async (data) => {
  try {
    const { sender, recipient } = data;
    const senderUser = await User.findByIdAndUpdate(
      sender,
      {
        $push: { friends: recipient },
      },
      { new: true }
    );
    const recipientUser = await User.findByIdAndUpdate(
      recipient,
      {
        $push: { friends: sender },
      },
      { new: true }
    ).select("_id socketId username firstName lastName email");
    // io.to(recipientUser.socketId).emit("new-friend-request", {
    //   message: "New Friend Request Receieved",
    // });
    await FriendRequest.findOneAndDelete({ sender, recipient });

    const newConversation = new Conversation({
      members: [sender, recipient],
    });
    const savedConversation = await newConversation.save();

    io.to(senderUser.socketId).emit("friend-request-accepted", {
      message: "Friend Request Accepted",
      data: recipientUser,
    });
  } catch (error) {
    console.error(error);
  }
};

export const SendFriendRequest = async (data) => {
  try {
    const { sender, recipient } = data;

    const recipientAcc = await findUserByEmailOrUserName(recipient);
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: sender, recipient: recipientAcc._id },
        { sender: recipientAcc._id, recipient: sender },
      ],
    });

    if (existingRequest) {
      console.log(
        "Friend request already exists between sender and recipient."
      );
      return;
    }
    const friendRequst = new FriendRequest({
      sender: sender,
      recipient: recipientAcc._id,
    });

    const newFriendReq = await friendRequst.save();
    const userData = {
      id: recipientAcc._id,
      firstName: recipientAcc.firstName,
      lastName: recipientAcc.lastName,
      createdAt: newFriendReq.createdAt,
    };
    io.to(recipientAcc.socketId).emit("new-friend-request", {
      message: "New Friend Request Receieved",
      data: userData,
    });
  } catch (error) {
    console.error(error);
  }
};
