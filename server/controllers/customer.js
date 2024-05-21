import Transaction from "../models/transactionModel.js";
import Product from "../models/productModel.js";

/**
 * req.body should be something like this:
 *
 * {
 *  "sortOption": {<key>: <asc or desc>}
 * }
 *
 * <key> can be "name", "type", "price", or "quantity"
 * <asc or desc>: 1 for ascending, -1 for descending
 * Only one key is allowed for now.
 */
const getProductListings = async (req, res) => {
  try {
    const { sortOption } = req.body;
    const products = await Product.find().sort(sortOption);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Unable to get products." });
  }
};

// create a transaction (order)
// order one product
const orderProduct = async (req, res) => {
  try {
    const { transactionId, productId, quantity, email } = req.body;
    const newTransaction = new Transaction({
      transactionId,
      productId,
      quantity,
      status: 0,
      email,
    });
    await newTransaction.save();
    res.status(201).json({ message: "Ordered successfully." });
  } catch (error) {
    res.status(500).json({ error: "Ordering failed." });
  }
};

export { getProductListings, orderProduct };