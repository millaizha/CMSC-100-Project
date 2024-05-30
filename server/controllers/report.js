// for analyzing sales reports
import Order from "../models/orderModel.js";

// only includes the orders that are sold, sorted by recency
// the cutoff would be in a latest provided date, along with the limit
const getRecentSales = async (req, res) => {
  const { earliestDate, limit } = req.query;

  try {
    const sales = await Order.find({
      status: 1,
      dateTimeOrdered: { $gte: new Date(earliestDate) },
    })
      .sort({
        dateTimeOrdered: -1,
      })
      .limit(limit);
    res.status(200).json(sales);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to get recent sales." });
  }
};

const getCancelledOrders = async (req, res) => {
  const { earliestDate, limit } = req.query;

  try {
    const sales = await Order.find({
      status: 2,
      dateTimeOrdered: { $gte: new Date(earliestDate) },
    })
      .sort({
        dateTimeOrdered: -1,
      })
      .limit(limit);
    res.status(200).json(sales);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to get cancelled orders." });
  }
};

// get all the list of products sold in a given time interval
// YYYY-MM-DD format
// Ex: 2024-05-25 doesn't include that day in 5 PM, it strictly means at 12 MN
// limit is applied in case the products are too much
const getProductsSold = async (req, res) => {
  const earliestDate = "2020-01-01";
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1); // Add 1 day to the current date
  const latestDate = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${tomorrow.getDate().toString().padStart(2, '0')}`;
  const limit = 50;
  try {
    const productsSold = await Order.aggregate([
      {
        $match: {
          dateTimeOrdered: {
            $gte: new Date(earliestDate),
            $lte: new Date(latestDate),
          },
          status: 1,
        },
      },
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: "$products.productId",
          totalSales: { $sum: "$products.totalProductSales" },
          totalQuantity: { $sum: "$products.count" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      {
        $unwind: "$productInfo",
      },
      {
        $project: {
          name: "$productInfo.name",
          imageUrl: "$productInfo.imageUrl",
          description: "$productInfo.description",
          price: "$productInfo.price",
          totalQuantity: "$totalQuantity",
          totalSales: "$totalSales",
          type: "$productInfo.type",
        },
      },
      {
        // sort by aggregate sales for now
        $sort: { totalSales: -1 },
      },
      {
        $limit: limit,
      },
    ]);

    res.status(200).json(productsSold);
  } catch (error) {
    res.status(500).json({ error: "Unable to get report." });
  }
};

// it just returns the total sales per week provided
// the _id denotes the _id-th week in a year
const getWeeklyReport = async (req, res) => {
  const { earliestDate, latestDate } = req.body;
  try {
    const salesReport = await Order.aggregate([
      {
        // only completed orders
        $match: {
          status: 1,
          dateTimeOrdered: {
            $gte: new Date(earliestDate),
            $lte: new Date(latestDate),
          },
        },
      },
      {
        $addFields: {
          week: { $isoWeek: "$dateTimeOrdered" },
          year: { $isoWeekYear: "$dateTimeOrdered" },
        },
      },
      {
        $group: {
          _id: { year: "$year", week: "$week" },
          totalSales: { $sum: "$totalOrderSales" },
        },
      },
      {
        $sort: { "_id.year": -1, "_id.week": -1 },
      },
      {
        $project: {
          _id: "$_id",
          totalSales: "$totalSales",
        },
      },
    ]);

    res.status(200).json(salesReport);
  } catch (error) {
    res.status(500).json({ error: "Unable to get report." });
  }
};

// it just returns the total sales per month provided
// the _id denotes the numerical month in a year
const getMonthlyReport = async (req, res) => {
  const { earliestDate, latestDate } = req.body;
  try {
    const salesReport = await Order.aggregate([
      {
        // only completed orders
        $match: {
          status: 1,
          dateTimeOrdered: {
            $gte: new Date(earliestDate),
            $lte: new Date(latestDate),
          },
        },
      },
      {
        $addFields: {
          year: { $isoWeekYear: "$dateTimeOrdered" },
          month: { $month: "$dateTimeOrdered" },
        },
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          totalSales: { $sum: "$totalOrderSales" },
        },
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1 },
      },
      {
        $project: {
          _id: "$_id",
          totalSales: "$totalSales",
        },
      },
    ]);

    res.status(200).json(salesReport);
  } catch (error) {
    res.status(500).json({ error: "Unable to get report." });
  }
};

// it just returns the total sales per month provided
// the _id denotes the year
const getYearlyReport = async (req, res) => {
  const { earliestDate, latestDate } = req.body;
  try {
    const salesReport = await Order.aggregate([
      {
        // only completed orders
        $match: {
          status: 1,
          dateTimeOrdered: {
            $gte: new Date(earliestDate),
            $lte: new Date(latestDate),
          },
        },
      },
      {
        $addFields: {
          year: { $isoWeekYear: "$dateTimeOrdered" },
        },
      },
      {
        $group: {
          _id: { year: "$year" },
          totalSales: { $sum: "$totalOrderSales" },
        },
      },
      {
        $sort: { "_id.year": -1 },
      },
      {
        $project: {
          _id: "$_id",
          totalSales: "$totalSales",
        },
      },
    ]);

    res.status(200).json(salesReport);
  } catch (error) {
    res.status(500).json({ error: "Unable to get report." });
  }
};

export {
  getRecentSales,
  getCancelledOrders,
  getProductsSold,
  getWeeklyReport,
  getMonthlyReport,
  getYearlyReport,
};
