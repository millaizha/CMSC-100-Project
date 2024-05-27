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

/**
 * GET /report/getRecentSales
 * Get recent sales (orders that are completed with status 1).
 * Ordered by recency.
 * The cutoff would be in a latest provided date.
 * Ex: 2024-05-25 doesn't include that day in 5 PM, it strictly means at 12 MN.
 * Limit indicates the maximum number of collections to be shown.
 *
 * Requires the Authorization header with the value "Bearer <token>".
 * User accessing it must be an admin.
 *
 * Inputs for req.body:
 * earliestDate - String (format: YYYY-MM-DD)
 * limit - Integer
 *
 * Response:
 * If successful: Status code 200; <sales list>
 * Else: Status code 500; "Unable to get recent sales"
 */
reportRoutes.get("/getRecentSales", verifyToken, verifyIfAdmin, getRecentSales);

/**
 * GET /report/getProductsSold
 * Get overall products that are sold.
 * Only sales are included (orders that are completed with status 1).
 * Ordered by aggregate sales per product.
 * Orders between the earliest and latest dates are included.
 * Ex: 2024-05-25 doesn't include that day in 5 PM, it strictly means at 12 MN.
 * Limit indicates the maximum number of collections to be shown.
 *
 * Requires the Authorization header with the value "Bearer <token>".
 * User accessing it must be an admin.
 *
 * Inputs for req.body:
 * earliestDate - String (format: YYYY-MM-DD)
 * latestDate - String (format: YYYY-MM-DD)
 * limit - Integer
 *
 * Returns:
 * An array containing the aggregated product info with the format:
 * {
 *  _id: the id of the product,
 *  name,
 *  description,
 *  price,
 *  totalQuantity: the total quantity sold for that product,
 *  totalSales: the total sales for that product (quantity * price)
 *  type: product type,
 * }
 *
 * Response:
 * If successful: Status code 200; <aggregate sales list per product>
 * Else: Status code 500; "Unable to get report."
 */
reportRoutes.get(
  "/getProductsSold",
  verifyToken,
  verifyIfAdmin,
  getProductsSold
);

/**
 * GET /report/getWeeklyReport
 * Get sale reports in the given week intervals
 * Only sales are included (orders that are completed with status 1).
 * Grouped by week.
 * Return length depends on the gap between earliest and latest dates.
 * Orders between the earliest and latest dates are included.
 * Ex: 2024-05-25 doesn't include that day in 5 PM, it strictly means at 12 MN.
 *
 * Requires the Authorization header with the value "Bearer <token>".
 * User accessing it must be an admin.
 *
 * Inputs for req.body:
 * earliestDate - String (format: YYYY-MM-DD)
 * latestDate - String (format: YYYY-MM-DD)
 *
 * Returns:
 * An array containing aggregated info with the format:
 * {
 *  _id: {year, week (numerical, ex: 20 = 20th week of that year)}
 *  totalSales: total sales within that week
 * }
 *
 * Response:
 * If successful: Status code 200; <aggregate sales list per week>
 * Else: Status code 500; "Unable to get report."
 */
reportRoutes.get(
  "/getWeeklyReport",
  verifyToken,
  verifyIfAdmin,
  getWeeklyReport
);

/**
 * GET /report/getMonthlyReport
 * Get sale reports in the given month intervals
 * Only sales are included (orders that are completed with status 1).
 * Grouped by month.
 * Return length depends on the gap between earliest and latest dates.
 * Orders between the earliest and latest dates are included.
 * Ex: 2024-05-25 doesn't include that day in 5 PM, it strictly means at 12 MN.
 *
 * Requires the Authorization header with the value "Bearer <token>".
 * User accessing it must be an admin.
 *
 * Inputs for req.body:
 * earliestDate - String (format: YYYY-MM-DD)
 * latestDate - String (format: YYYY-MM-DD)
 *
 * Returns:
 * An array containing aggregated info with the format:
 * {
 *  _id: {year, month (numerical, ex: 5 = May)}
 *  totalSales: total sales within that month
 * }
 *
 * Response:
 * If successful: Status code 200; <aggregate sales list per month>
 * Else: Status code 500; "Unable to get report."
 */
reportRoutes.get(
  "/getMonthlyReport",
  verifyToken,
  verifyIfAdmin,
  getMonthlyReport
);

/**
 * GET /report/getYearlyReport
 * Get sale reports in the given year intervals
 * Only sales are included (orders that are completed with status 1).
 * Grouped by year.
 * Return length depends on the gap between earliest and latest dates.
 * Orders between the earliest and latest dates are included.
 * Ex: 2024-05-25 doesn't include that day in 5 PM, it strictly means at 12 MN.
 *
 * Requires the Authorization header with the value "Bearer <token>".
 * User accessing it must be an admin.
 *
 * Inputs for req.body:
 * earliestDate - String (format: YYYY-MM-DD)
 * latestDate - String (format: YYYY-MM-DD)
 *
 * Returns:
 * An array containing aggregated info with the format:
 * {
 *  _id: {year},
 *  totalSales: total sales within that year
 * }
 *
 * Response:
 * If successful: Status code 200; <aggregate sales list per year>
 * Else: Status code 500; "Unable to get report."
 */
reportRoutes.get(
  "/getYearlyReport",
  verifyToken,
  verifyIfAdmin,
  getYearlyReport
);

export default reportRoutes;
