// for analyzing sales reports
import Transaction from "../models/transactionModel.js";

// only includes the transactions that are sold, sorted by recency
// the cutoff would be in a latest provided date, along with the limit
const getRecentSales = async (req, res) => {
  const { earliestDate, limit } = req.body;

  try {
    const sales = await Transaction.find({
      status: 1,
      dateTimeOrdered: { $gte: new Date(earliestDate) },
    })
      .sort({
        dateTimeOrdered: -1,
      })
      .limit(limit);
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: "Unable to get recent sales." });
  }
};

// get all the list of products sold in a given time interval
// YYYY-MM-DD format
// Ex: 2024-05-25 doesn't include that day in 5 PM, it strictly means at 12 MN
// limit is applied in case the products are too much
const getProductsSold = async (req, res) => {
  const { earliestDate, latestDate, limit } = req.body;
  try {
    const productsSold = await Transaction.aggregate([
      {
        // only completed transactions
        $match: {
          status: 1,
          dateTimeOrdered: {
            $gte: new Date(earliestDate),
            $lte: new Date(latestDate),
          },
        },
      },
      {
        $group: {
          _id: "$productId",
          aggregateSales: { $sum: "$totalCost" },
          aggregateQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productInfo", // New alias
        },
      },
      {
        $unwind: "$productInfo",
      },
      {
        $project: {
          name: "$productInfo.name",
          description: "$productInfo.description",
          price: "$productInfo.price",
          aggregateQuantity: "$aggregateQuantity",
          type: "$productInfo.type",
          aggregateSales: "$aggregateSales",
        },
      },
      {
        // sort by aggregate sales for now
        $sort: { aggregateSales: -1 },
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
    const productsSold = await Transaction.aggregate([
      {
        // only completed transactions
        $match: {
          status: 1,
          dateTimeOrdered: {
            $gte: new Date(earliestDate),
            $lte: new Date(latestDate),
          },
        },
      },
      {
        $group: {
          _id: { $week: "$dateTimeOrdered" },
          aggregateSales: { $sum: "$totalCost" },
        },
      },
    ]);

    res.status(200).json(productsSold);
  } catch (error) {
    res.status(500).json({ error: "Unable to get report." });
  }
};

// it just returns the total sales per month provided
// the _id denotes the numerical month in a year
const getMonthlyReport = async (req, res) => {
  const { earliestDate, latestDate } = req.body;
  try {
    const productsSold = await Transaction.aggregate([
      {
        // only completed transactions
        $match: {
          status: 1,
          dateTimeOrdered: {
            $gte: new Date(earliestDate),
            $lte: new Date(latestDate),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$dateTimeOrdered" },
          aggregateSales: { $sum: "$totalCost" },
        },
      },
    ]);

    res.status(200).json(productsSold);
  } catch (error) {
    res.status(500).json({ error: "Unable to get report." });
  }
};

// it just returns the total sales per month provided
// the _id denotes the year
const getYearlyReport = async (req, res) => {
  const { earliestDate, latestDate } = req.body;
  try {
    const productsSold = await Transaction.aggregate([
      {
        // only completed transactions
        $match: {
          status: 1,
          dateTimeOrdered: {
            $gte: new Date(earliestDate),
            $lte: new Date(latestDate),
          },
        },
      },
      {
        $group: {
          _id: { $year: "$dateTimeOrdered" },
          aggregateSales: { $sum: "$totalCost" },
        },
      },
    ]);

    res.status(200).json(productsSold);
  } catch (error) {
    res.status(500).json({ error: "Unable to get report." });
  }
};

export {
  getRecentSales,
  getProductsSold,
  getWeeklyReport,
  getMonthlyReport,
  getYearlyReport,
};
