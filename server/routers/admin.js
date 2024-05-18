import express from "express";
import { addProduct } from "../controllers/admin.js";

const adminRoutes = express.Router();

adminRoutes.post("/addProduct", addProduct);

export default adminRoutes;
