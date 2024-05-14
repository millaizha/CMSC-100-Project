import express from "express";
import { register, getRegisteredUsers, login } from "../controllers/auth.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.get("/register", getRegisteredUsers);
authRoutes.post("/login", login);

export default authRoutes;
