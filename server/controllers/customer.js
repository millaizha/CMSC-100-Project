import Product from "../models/productModel.js";
import Transaction from "../models/transactionModel.js";

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
    const { productId, quantity, email } = req.body;
    // retrieve the product's price
    const product = await Product.findById(productId);
    const newTransaction = new Transaction({
      productId,
      quantity,
      status: 0,
      email,
      productPrice: product.price,
    });
    await newTransaction.save();
    res.status(200).json({ message: "Ordered successfully." });
  } catch (error) {
    res.status(500).json({ error: "Ordering failed." });
  }
};

// cancel an order
const cancelTransaction = async (req, res) => {
  try {
    const { transactionId } = req.body;
    await Transaction.findOneAndUpdate({ _id: transactionId }, { status: 2 });
    res.status(200).json({ message: "Cancellation confirmed." });
  } catch (error) {
    res.status(500).json({ error: "Cancellation failed." });
  }
};

// get the transaction by the user
const getTransactions = async (req, res) => {
  try {
    const { email } = req.body;
    const transactions = await Transaction.find({ email });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Unable to get transactions." });
  }
};

export { getProductListings, orderProduct, cancelTransaction, getTransactions };
