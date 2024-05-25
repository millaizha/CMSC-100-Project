import express from "express";
import {
  addProduct,
  confirmTransaction,
  getProductListings,
  getRegisteredUsers,
  getTransactions,
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
 * GET /admin/getTransactions
 * Get all transactions in the database.
 *
 * Requires the Authorization header with the value "Bearer <token>".
 * User accessing it must be an admin.
 *
 * Inputs for req.body:
 * None
 *
 * Response:
 * If successful: Status code 200, <list of transactions>
 * Else: Status code 500; "Unable to get transactions"
 */
adminRoutes.get(
  "/getTransactions",
  verifyToken,
  verifyIfAdmin,
  getTransactions
);

/**
 * POST /admin/confirmTransaction
 * Confirms a transaction.
 * This marks the transaction confirmed and deducts the inventory of a product.
 *
 * Requires the Authorization header with the value "Bearer <token>".
 * User accessing it must be an admin.
 *
 * Inputs for req.body:
 * transactionId - String
 *
 * Response:
 * If successful: Status code 200, "Transaction confirmed"
 * If inventory is insufficient: Status code 400: "Insufficient product quantity"
 * Else: Status code 500; "Transaction confirmation failed"
 */
adminRoutes.post(
  "/confirmTransaction",
  verifyToken,
  verifyIfAdmin,
  confirmTransaction
);

export default adminRoutes;
