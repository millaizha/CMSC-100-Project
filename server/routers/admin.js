import express from "express";
import {
  addProduct,
  getProductListings,
  getRegisteredUsers,
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
 * productId - String (unique)
 * name - String (unique)
 * description - String (optional)
 * price - Number
 * type - Number (1 or 2)
 * quantity - Number
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

export default adminRoutes;
