import express from "express";
import {
  addProduct,
  confirmOrder,
  getProductListings,
  getRegisteredUsers,
  getOrders,
} from "../controllers/admin.js";
import { verifyToken, verifyIfAdmin } from "../utils/middleware.js";

const adminRoutes = express.Router();

/**
 * POST /admin/addProduct
 * Add one product.
 *
 * Requires the Authorization header with the value "Bearer <token>".
 * User accessing it must be an admin.
 *
 * Inputs for req.body:
 * name - String (unique)
 * description - String (optional)
 * price - Number
 * type - Number (1 or 2)
 * quantity - Number
 * imageUrl - String (optional)
 *
 * Response:
 * If successful: Status code 201; "Product created successfully"
 * Else: Status code 500; "Error adding the new product"
 */
adminRoutes.post("/addProduct", verifyToken, verifyIfAdmin, addProduct);

/**
 * GET /admin/getProductListings
 * Get all products in the database.
 *
 * Requires the Authorization header with the value "Bearer <token>".
 * User accessing it must be an admin.
 *
 * Inputs for req.body:
 * sortOption - Object
 *
 * Example of the req.body:
 *
 * {
 *  "sortOption": {<key>: <asc or desc>}
 * }
 *
 * <key> can be "name", "type", "price", or "quantity"
 * <asc or desc>: 1 for ascending, -1 for descending
 * Only one key is allowed for now.
 *
 * Response:
 * If successful: Status code 200, <list of products>
 * Else: Status code 500; "Unable to get products"
 */
adminRoutes.get(
  "/getProductListings",
  verifyToken,
  verifyIfAdmin,
  getProductListings
);

/**
 * GET /admin/registeredUsers
 * Get all registered users in the database.
 *
 * Requires the Authorization header with the value "Bearer <token>".
 * User accessing it must be an admin.
 *
 * Inputs for req.body:
 * None
 *
 * Response:
 * If successful: Status code 200, <list of users>
 * Else: Status code 500; "Unable to get users"
 */
adminRoutes.get(
  "/registeredUsers",
  verifyToken,
  verifyIfAdmin,
  getRegisteredUsers
);

/**
 * GET /admin/getOrders
 * Get all orders in the database, ordered by recency.
 *
 * Requires the Authorization header with the value "Bearer <token>".
 * User accessing it must be an admin.
 *
 * Inputs for req.body:
 * status - Number (0, 1, 2)
 * 0 - Pending
 * 1 - Confirmed
 * 2 - Canceled
 *
 * Response:
 * If successful: Status code 200, <list of orders>
 * Else: Status code 500; "Unable to get orders"
 */
adminRoutes.get("/getOrders", verifyToken, verifyIfAdmin, getOrders);

/**
 * POST /admin/confirmOrder
 * Confirms a order.
 * This marks the order confirmed and deducts the inventory of products.
 *
 * Requires the Authorization header with the value "Bearer <token>".
 * User accessing it must be an admin.
 *
 * Inputs for req.body:
 * orderId - String
 *
 * Response:
 * If successful: Status code 200, "Order confirmed"
 * If inventory is insufficient: Status code 400: "Insufficient product quantity for <product>"
 * Else: Status code 500; "Order confirmation failed"
 */
adminRoutes.post("/confirmOrder", verifyToken, verifyIfAdmin, confirmOrder);

export default adminRoutes;
