import express from "express";

import {
  addConversation,
  getConversation,
} from "../controllers/conversation/conversation.mjs";
import { verifyTokenAndAuth } from "../middleware/verifyToken.mjs";

const router = express.Router();

router.get("/:userId",verifyTokenAndAuth, getConversation);

router.post("/:userId",verifyTokenAndAuth, addConversation);



export default router;
