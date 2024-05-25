import Product from "../models/productModel.js";
import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description = null,
      price,
      type,
      quantity,
      imageUrl = null,
    } = req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      type,
      quantity,
      imageUrl,
    });
    await newProduct.save();
    res.status(201).json({ message: "Product created successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error adding the new product." });
  }
};

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

const getRegisteredUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Unable to get users" });
  }
};

// show all transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Unable to get transactions." });
  }
};

// fulfill an order
const confirmTransaction = async (req, res) => {
  try {
    const { transactionId } = req.body;
    const transaction = await Transaction.findOneAndUpdate(
      { _id: transactionId },
      { status: 1 }
    );
    // check if the inventory suffices
    const product = await Product.findById(transaction.productId);
    if (product.quantity < transaction.quantity) {
      res.status(400).json({ error: "Insufficient product quantity." });
    } else {
      await Product.findOneAndUpdate(
        { _id: product._id },
        { quantity: product.quantity - transaction.quantity }
      );
      res.status(200).json({ message: "Transaction confirmed." });
    }
  } catch (error) {
    res.status(500).json({ error: "Transaction confirmation failed." });
  }
};

export {
  addProduct,
  getProductListings,
  getRegisteredUsers,
  getTransactions,
  confirmTransaction,
};
