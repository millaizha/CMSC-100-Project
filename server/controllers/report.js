// for analyzing sales reports
import Transaction from "../models/transactionModel.js";

// get all the list of products sold
const getProductsSold = async (req, res) => {
  try {
    const productsSold = await Transaction.aggregate([
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
          as: "transactionWithProductInfo", // New alias
        },
      },
      {
        $unwind: "$transactionWithProductInfo",
      },
      {
        $project: {
          totalSales: {
            $multiply: ["$totalQuantity", "$transactionWithProductInfo.price"],
          },
        },
      },
    ]);

    res.status(200).json(productsSold);
  } catch (error) {
    res.status(500).json({ error: "Unable to get transactions." });
  }
};

export { getProductsSold };
