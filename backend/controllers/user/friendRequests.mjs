import FriendRequest from "../../models/FreiendRequest.mjs";
import User from "../../models/User.mjs";
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
    console.log(userId);
    const friendRequests = await FriendRequest.find({
      recipient: userId,
    }).populate("sender", "_id firstName lastName email username");
    res.status(200).json({
      status: "success",
      data: friendRequests,
      message: "Request Fetched Successfully",
    });
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
export const SendFriendRequest = async (data, io) => {
  try {
    const { sender, recipient } = data;
    console.log(recipient);
    const recipientAcc = await findUserByEmailOrUserName(recipient);
    console.log(recipientAcc);
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
