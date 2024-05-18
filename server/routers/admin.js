import express from "express";
import { addProduct, getProductListings } from "../controllers/admin.js";
import { verifyToken, verifyIfAdmin } from "../utils/middleware.js";

const adminRoutes = express.Router();

adminRoutes.post("/addProduct", verifyToken, verifyIfAdmin, addProduct);
adminRoutes.get(
  "/getProductListings",
  verifyToken,
  verifyIfAdmin,
  getProductListings
);

export default adminRoutes;
