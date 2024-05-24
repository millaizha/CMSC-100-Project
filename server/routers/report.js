import express from "express";
import {
  getMonthlyReport,
  getProductsSold,
  getRecentSales,
  getWeeklyReport,
  getYearlyReport,
} from "../controllers/report.js";
import { verifyIfAdmin, verifyToken } from "../utils/middleware.js";

const reportRoutes = express.Router();

reportRoutes.get("/getRecentSales", verifyToken, verifyIfAdmin, getRecentSales);

reportRoutes.get(
  "/getProductsSold",
  verifyToken,
  verifyIfAdmin,
  getProductsSold
);

reportRoutes.get(
  "/getWeeklyReport",
  verifyToken,
  verifyIfAdmin,
  getWeeklyReport
);

reportRoutes.get(
  "/getMonthlyReport",
  verifyToken,
  verifyIfAdmin,
  getMonthlyReport
);

reportRoutes.get(
  "/getYearlyReport",
  verifyToken,
  verifyIfAdmin,
  getYearlyReport
);

export default reportRoutes;
