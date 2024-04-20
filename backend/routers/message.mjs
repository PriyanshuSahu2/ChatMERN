import express from "express";
import {
  addMessage,
  getMessages,
} from "../controllers/conversation/message.mjs";
import { verifyTokenAndAuth } from "../middleware/verifyToken.mjs";

const router = express.Router();

router.get("/:userId/:conversationId", verifyTokenAndAuth, getMessages);

router.post("/:userId",verifyTokenAndAuth, addMessage);

export default router;
