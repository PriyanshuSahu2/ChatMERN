import express from "express";
import {
  addMessage,
  getMessages,
} from "../controllers/conversation/message.mjs";
import { verifyTokenAndAuth } from "../middleware/verifyToken.mjs";

const router = express.Router();

router.get("/:conversationId", verifyTokenAndAuth, getMessages);

router.post("/",verifyTokenAndAuth, addMessage);

export default router;
