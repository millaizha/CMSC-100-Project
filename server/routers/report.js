import express from "express";
import {
  getProductsSold,
  getRecentTransactions,
} from "../controllers/report.js";
import { verifyIfAdmin, verifyToken } from "../utils/middleware.js";

const reportRoutes = express.Router();

reportRoutes.get(
  "/getRecentTransactions",
  verifyToken,
  verifyIfAdmin,
  getRecentTransactions
);

reportRoutes.get(
  "/getProductsSold",
  verifyToken,
  verifyIfAdmin,
  getProductsSold
);

export default reportRoutes;
