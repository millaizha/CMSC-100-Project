import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
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

// show all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Unable to get orders." });
  }
};

// fulfill an order
const confirmOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findOneAndUpdate({ _id: orderId }, { status: 1 });
    // check if the inventory suffices
    const product = await Product.findById(order.productId);
    if (product.quantity < order.quantity) {
      res.status(400).json({ error: "Insufficient product quantity." });
    } else {
      await Product.findOneAndUpdate(
        { _id: product._id },
        { quantity: product.quantity - order.quantity }
      );
      res.status(200).json({ message: "Order confirmed." });
    }
  } catch (error) {
    res.status(500).json({ error: "Order confirmation failed." });
  }
};

export {
  addProduct,
  getProductListings,
  getRegisteredUsers,
  getOrders,
  confirmOrder,
};
