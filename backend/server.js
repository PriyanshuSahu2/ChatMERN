import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { WebSocketServer } from "ws";
import { Server } from "socket.io";

//Router
import AuthRouter from "./routers/auth.mjs";
import ConversationRouter from "./routers/conversation.mjs";
import MessageRouter from "./routers/conversation.mjs";
import UserRouter from "./routers/user.mjs";

//models
import User from "./models/User.mjs";
import { SendFriendRequest } from "./controllers/user/friendRequests.mjs";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

//use Routes
app.use("/api/auth", AuthRouter);
app.use("/api/conversation", ConversationRouter);
app.use("/api/message", MessageRouter);
app.use("/api/user", UserRouter);

const PORT = 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected"))
  .catch((error) => console.error(error));

const server = app.listen(PORT, () => {
  console.clear();
  console.log(
    "\x1b[36m",
    "Server Started on",
    "\x1b[32m",
    `\x1B[4mhttp://localhost:${PORT}\x1B[m`
  );
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", async (socket) => {
  const userId = socket.handshake.query.userId;
  const socketId = socket.id;
  console.log(userId);
  console.log(`User connected: ${socketId}`);
  if (userId) {
    try {
      await User.findByIdAndUpdate(userId, { socketId: socketId });
    } catch (error) {
      // console.log(error);
    }
  }
  socket.on("friend-request", async (data) => {
    console.log(data)
    await SendFriendRequest(data, io);
  });
});
