import express from "express";
import {
  cancelOrder,
  getProductListings,
  orderProduct,
  getOrders,
  getCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
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
 * name - String (customer name)
 * email - String (customer email)
 * products - Array<Object>
 * dateTimeOrdered - ISO DateTime String (optional)
 * status - Number (default: 0)
 *
 * Each product in the array products is formatted as follows:
 * {
 *  productId - String (referencing the Product collection)
 *  name - String
 *  count - Number (quantity of products to purchase)
 *  price - Number
 * }
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
 * Get all the user's orders, ordered by recency.
 *
 * Requires the Authorization header with the value "Bearer <token>".
 * User accessing it must be a regular user.
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
customerRoutes.get("/getOrders", verifyToken, verifyIfUser, getOrders);

/**
 * GET /customer/getCart
 * Get the user's cart.
 *
 * Requires the Authorization header with the value "Bearer <token>".
 * User accessing it must be a regular user.
 *
 * Input for req.query:
 * email - String
 *
 * Response:
 * If successful: Status code 200, <cart>
 * If cart not found: Status code 404, "Cart not found"
 * Else: Status code 500; "Error fetching cart items"
 */
customerRoutes.get("/getCart", verifyToken, verifyIfUser, getCart);

/**
 * POST /customer/addToCart
 * Add a product and its quantity to the user's cart.
 * Creates a new cart if one doesn't exist.
 *
 * Requires the Authorization header with the value "Bearer <token>".
 * User accessing it must be a regular user.
 *
 * Inputs for req.body:
 * email - String
 * product - Object
 *  _id - String (product ID)
 *  selectedQuantity - Number
 *
 * Response:
 * If successful: Status code 200, <updated cart>
 * Else: Status code 500; "Error adding to cart"
 */
customerRoutes.post("/addToCart", verifyToken, verifyIfUser, addToCart);

/**
 * POST /customer/removeFromCart
 * Remove a product from the user's cart.
 *
 * Requires the Authorization header with the value "Bearer <token>".
 * User accessing it must be a regular user.
 *
 * Inputs for req.body:
 * email - String
 * productId - String
 *
 * Response:
 * If successful: Status code 200, <updated cart>
 * If cart not found: Status code 404, "Cart not found"
 * Else: Status code 500; "Error removing from cart"
 */
customerRoutes.post(
  "/removeFromCart",
  verifyToken,
  verifyIfUser,
  removeFromCart
);

/**
 * POST /customer/updateCartQuantity
 * Update the quantity of a product in the user's cart.
 *
 * Requires the Authorization header with the value "Bearer <token>".
 * User accessing it must be a regular user.
 *
 * Inputs for req.body:
 * email - String
 * productId - String
 * quantity - Number (new quantity)
 *
 * Response:
 * If successful: Status code 200, <updated cart>
 * If cart not found: Status code 404, "Cart not found"
 * If product not found in cart: Status code 404, "Product not found in cart"
 * Else: Status code 500; "Error updating cart quantity"
 */
customerRoutes.post(
  "/updateCartQuantity",
  verifyToken,
  verifyIfUser,
  updateCartQuantity
);

/**
 * POST /customer/clearCart
 * Clears the user's cart.
 *
 * Requires the Authorization header with the value "Bearer <token>".
 * User accessing it must be a regular user.
 *
 * Inputs for req.body:
 * email - String
 *
 * Response:
 * If successful: Status code 200, "Cart cleared successfully"
 * If cart not found: Status code 404, "Cart not found"
 * Else: Status code 500; "Error clearing cart"
 */
customerRoutes.post("/clearCart", verifyToken, verifyIfUser, clearCart);

export default customerRoutes;
