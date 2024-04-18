import express from "express";

import {
  addConversation,
  getConversation,
} from "../controllers/conversation/conversation.mjs";
import { verifyTokenAndAuth } from "../middleware/verifyToken.mjs";

const router = express.Router();

router.get("/:id",verifyTokenAndAuth, getConversation);

router.post("/",verifyTokenAndAuth, addConversation);



export default router;
