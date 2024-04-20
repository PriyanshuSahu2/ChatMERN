import express from "express";

import { verifyTokenAndAuth } from "../middleware/verifyToken.mjs";
import {
  acceptFriendRequest,
  getFriendRequest,
  rejectFriendRequest,
  sendFriendRequest,
} from "../controllers/user/friendRequests.mjs";
import { getFriends } from "../controllers/user/getFriends.mjs";

const router = express.Router();

router.get("/get-friend-requests/:userId", verifyTokenAndAuth, getFriendRequest);

router.get("/get-friends", verifyTokenAndAuth, getFriends);

router.put("/accept-friend-request", verifyTokenAndAuth, acceptFriendRequest);

router.post("/send-friend-request/:userId", verifyTokenAndAuth, sendFriendRequest);

router.delete("/reject-friend-request/:userId/:requestId",verifyTokenAndAuth,rejectFriendRequest)

export default router;
