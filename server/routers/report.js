import express from "express";
import { getProductsSold, getRecentSales } from "../controllers/report.js";
import { verifyIfAdmin, verifyToken } from "../utils/middleware.js";

const reportRoutes = express.Router();

reportRoutes.get("/getRecentSales", verifyToken, verifyIfAdmin, getRecentSales);

reportRoutes.get(
  "/getProductsSold",
  verifyToken,
  verifyIfAdmin,
  getProductsSold
);

export default reportRoutes;
