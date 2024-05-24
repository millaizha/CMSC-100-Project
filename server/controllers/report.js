// for analyzing sales reports
import Transaction from "../models/transactionModel.js";

// get all the list of products sold
const getProductsSold = async (req, res) => {
  try {
    const productsSold = await Transaction.aggregate([
      {
        $group: {
          _id: "$productId",
          totalSales: { $sum: "$quantity" },
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
          totalPrice: { $multiply: ["$totalSales", "$productInfo.price"] },
        },
      },
    ]);

    res.status(200).json(productsSold);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to get transactions." });
  }
};

export { getProductsSold };
