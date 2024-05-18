import express from "express";
import {
  addProduct,
  getProductListings,
  getRegisteredUsers,
} from "../controllers/admin.js";
import { verifyToken, verifyIfAdmin } from "../utils/middleware.js";

const adminRoutes = express.Router();

adminRoutes.post("/addProduct", verifyToken, verifyIfAdmin, addProduct);
adminRoutes.get(
  "/getProductListings",
  verifyToken,
  verifyIfAdmin,
  getProductListings
);

adminRoutes.get(
  "/getRegisteredUsers",
  verifyToken,
  verifyIfAdmin,
  getRegisteredUsers
);

export default adminRoutes;
