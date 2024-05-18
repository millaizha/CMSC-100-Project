import express from "express";
import { addProduct, getProductListings } from "../controllers/admin.js";

const adminRoutes = express.Router();

adminRoutes.post("/addProduct", addProduct);
adminRoutes.get("/getProductListings", getProductListings);

export default adminRoutes;
