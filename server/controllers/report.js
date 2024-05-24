// for analyzing sales reports
import Transaction from "../models/transactionModel.js";

// only includes the transactions that are sold, sorted by recency
// the cutoff would be in a latest provided date, along with the limit
const getRecentSales = async (req, res) => {
  const { latestDate, limit } = req.body;

  try {
    const sales = await Transaction.find({
      status: 1,
      dateTimeOrdered: { $gte: new Date(latestDate) },
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

// get all the list of products sold
const getProductsSold = async (req, res) => {
  try {
    const productsSold = await Transaction.aggregate([
      {
        // only completed transactions
        $match: {
          status: 1,
        },
      },
      {
        $group: {
          _id: "$productId",
          totalQuantity: { $sum: "$quantity" },
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
          type: "$productInfo.type",
          totalQuantity: "$totalQuantity",
          totalSales: {
            $multiply: ["$totalQuantity", "$productInfo.price"],
          },
        },
      },
    ]);

    res.status(200).json(productsSold);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to get report." });
  }
};

export { getRecentSales, getProductsSold };
