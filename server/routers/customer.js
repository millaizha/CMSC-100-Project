import express from "express";
import {
  cancelOrder,
  getProductListings,
  orderProduct,
  getOrders,
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
 * POST /customer/cancelOrder
 * Cancels a order.
 * This marks the order cancelled.
 *
 * Requires the Authorization header with the value "Bearer <token>".
 * User accessing it must be a regular user.
 *
 * Inputs for req.body:
 * orderId - String
 *
 * Response:
 * If successful: Status code 200, "Cancellation confirmed"
 * Else: Status code 500; "Cancellation failed"
 */
customerRoutes.post("/cancelOrder", verifyToken, verifyIfUser, cancelOrder);

/**
 * GET /customer/getOrders
 * Get all the user's orders
 *
 * Requires the Authorization header with the value "Bearer <token>".
 * User accessing it must be a regular user.
 *
 * Inputs for req.body:
 * None
 *
 * Response:
 * If successful: Status code 200, <list of orders>
 * Else: Status code 500; "Unable to get orders"
 */
customerRoutes.get("/getOrders", verifyToken, verifyIfUser, getOrders);

export default customerRoutes;
