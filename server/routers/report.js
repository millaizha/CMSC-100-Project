import express from "express";
import { getProductsSold } from "../controllers/report.js";
import { verifyIfAdmin, verifyToken } from "../utils/middleware.js";

const reportRoutes = express.Router();

reportRoutes.get(
  "/getProductsSold",
  verifyToken,
  verifyIfAdmin,
  getProductsSold
);

export default reportRoutes;
