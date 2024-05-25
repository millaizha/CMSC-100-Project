import express from "express";
import {
  cancelTransaction,
  getProductListings,
  orderProduct,
  getTransactions,
} from "../controllers/customer.js";
import { verifyIfUser, verifyToken } from "../utils/middleware.js";

const customerRoutes = express.Router();

/**
 * GET /customer/getProductListings
 * Get all products in the database.
 *
 * Requires the Authorization header with the value "Bearer <token>".
 * User accessing it must be a regular user.
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
customerRoutes.get(
  "/getProductListings",
  verifyToken,
  verifyIfUser,
  getProductListings
);

/**
 * POST /customer/orderProduct
 * Order one product.
 *
 * Requires the Authorization header with the value "Bearer <token>".
 * User accessing it must be a regular user.
 *
 * Inputs for req.body:
 * productId - String
 * quantity - Number
 *
 * Response:
 * If successful: Status code 200; "Ordered successfully"
 * Else: Status code 500; "Ordering failed"
 */
customerRoutes.post("/orderProduct", verifyToken, verifyIfUser, orderProduct);

/**
 * POST /customer/cancelTransaction
 * Cancels a transaction.
 * This marks the transaction cancelled.
 *
 * Requires the Authorization header with the value "Bearer <token>".
 * User accessing it must be a regular user.
 *
 * Inputs for req.body:
 * transactionId - String
 *
 * Response:
 * If successful: Status code 200, "Cancellation confirmed"
 * Else: Status code 500; "Cancellation failed"
 */
customerRoutes.post(
  "/cancelTransaction",
  verifyToken,
  verifyIfUser,
  cancelTransaction
);

/**
 * GET /customer/getTransactions
 * Get all the user's transactions
 *
 * Requires the Authorization header with the value "Bearer <token>".
 * User accessing it must be a regular user.
 *
 * Inputs for req.body:
 * None
 *
 * Response:
 * If successful: Status code 200, <list of transactions>
 * Else: Status code 500; "Unable to get transactions"
 */
customerRoutes.get(
  "/getTransactions",
  verifyToken,
  verifyIfUser,
  getTransactions
);

export default customerRoutes;
