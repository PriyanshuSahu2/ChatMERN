import express from "express";
import { login } from "../controllers/auth/login.mjs";
import { Register } from "../controllers/auth/register.mjs";
import User from "../models/User.mjs";

const router = express.Router();

router.post("/login", login);

router.post("/register", Register);

export default router;
