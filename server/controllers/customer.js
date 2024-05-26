import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

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

// create a order
// order one product
const orderProduct = async (req, res) => {
  try {
    const { name, email, products, dateTimeOrdered, status = 0 } = req.body;

    // recalculate the total product sales
    let totalOrderSales = 0;
    for (let product of products) {
      product.totalProductSales = product.count * product.price;
      totalOrderSales += product.totalProductSales;
    }

    const newOrder = new Order({
      name,
      email,
      products,
      dateTimeOrdered,
      status,
      totalOrderSales,
    });
    await newOrder.save();
    res.status(200).json({ message: "Ordered successfully." });
  } catch (error) {
    res.status(500).json({ error: "Ordering failed." });
  }
};

// cancel an order
const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    await Order.findOneAndUpdate({ _id: orderId }, { status: 2 });
    res.status(200).json({ message: "Cancellation confirmed." });
  } catch (error) {
    res.status(500).json({ error: "Cancellation failed." });
  }
};

// get the order by the user
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ email: req.tokenInfo.email });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Unable to get orders." });
  }
};

export { getProductListings, orderProduct, cancelOrder, getOrders };
