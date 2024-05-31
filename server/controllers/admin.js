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
    console.error("Error adding product:", error); 
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
  const { status } = req.query;
  try {
    const orders = await Order.find({ status: status }).sort({
      dateTimeOrdered: -1,
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Unable to get orders." });
  }
};

// fulfill an order
const confirmOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);          
    const productOrders = order.products;
    // check if the inventory suffices
    let orderSuffices = true;
    let productError;
    for (let productOrder of productOrders) {
      const productStore = await Product.findById(productOrder.productId);
      if (productStore.quantity < productOrder.count) {
        orderSuffices = false;
        productError = productStore.name;
        break;
      }
    }

    if (orderSuffices) {
      await Order.findOneAndUpdate({ _id: orderId }, { status: 1 });
      res.status(200).json({ message: "Order confirmed." });
    } else {
      res
        .status(400)
        .json({ error: `Insufficient inventory for ${productError}.` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Order confirmation failed." });
  }
};

// cancel an order
const cancelOrder = async (req, res) => {
  try{
    const { orderId } = req.body;
    const order = await Order.findById(orderId);  

    for (let product of order.products) {
      const productInventory = await Product.findById(product.productId);

      await Product.findByIdAndUpdate(product.productId, {
        quantity: productInventory.quantity + product.count
      });
    }

    await Order.findOneAndUpdate({ _id: orderId }, { status: 2 });

    res.status(200).json({ message: "Order cancelled." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Order cancellation failed." });
  }
}

// update stock in inventory
const updateStock = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    await Product.findByIdAndUpdate(productId, { quantity: quantity });
    res.status(200).json({ message: "Stock updated." });
  }
  catch (error) {
    res.status(500).json({ error: "Stock update failed." });
  } 
};

export {
  addProduct,
  getProductListings,
  getRegisteredUsers,
  getOrders,
  confirmOrder,
  cancelOrder,
  updateStock
};
