import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

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
    const products = await Product.find({ quantity: { $gt: 0 } }).sort(sortOption);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Unable to get products." });
  }
};

// create a order
// order one product
const orderProduct = async (req, res) => {
  try {
    const { name, email, address, products, shippingFee, status = 0 } = req.body;

    // recalculate the total product sales
    let totalOrderSales = 0;
    for (let product of products) {
      const productInventory = await Product.findById(product.productId);

      if (productInventory.quantity < product.count) 
        return res.status(400).json({ error: "Insufficient stock for one or more items" });

      product.totalProductSales = product.count * product.price;
      totalOrderSales += product.totalProductSales;
    }

    totalOrderSales += shippingFee;

    const newOrder = new Order({
      name,
      email,
      address,
      products,
      status,
      totalOrderSales,
      shippingFee,
    });

    await newOrder.save();
    res.status(200).json({ message: "Ordered successfully." });
  } catch (error) {
    console.log(error);
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
  const { email, status } = req.query;
  try {
    const orders = await Order.find({
      email: email,
      status: status,
    }).sort({
      dateTimeOrdered: -1,
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Unable to get orders." });
  }
};

// get the cart of the user
const getCart = async (req, res) => {
  try {
    const { email } = req.query;
    const cart = await Cart.findOne({ email }).populate("items.product");
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching cart items" });
  }
};

// add a product and their quantity to the cart of the user
// if cart is not yet existent, create a new one
const addToCart = async (req, res) => {
  try {
    const { email, product } = req.body;
    let cart = await Cart.findOne({ email });

    if (!cart) {
      cart = new Cart({
        email,
        items: [{ product: product._id, quantity: product.selectedQuantity }],
      });
    } else {
      const existingProductIndex = cart.items.findIndex(
        (item) => item.product.toString() === product._id
      );
      if (existingProductIndex !== -1) {
        cart.items[existingProductIndex].quantity += product.selectedQuantity;
      } else {
        cart.items.push({
          product: product._id,
          quantity: product.selectedQuantity,
        });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error adding to cart" });
  }
};

// remove a product from the cart of the user
const removeFromCart = async (req, res) => {
  try {
    const { email, productId } = req.body;
    const cart = await Cart.findOne({ email });

    if (cart) {
      cart.items = cart.items.filter(
        (item) => item._id.toString() !== productId
      );

      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ error: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error removing from cart" });
  }
};

// update the quantity of a product in the cart of the user
const updateCartQuantity = async (req, res) => {
  try {
    const { email, productId, quantity } = req.body;
    const cart = await Cart.findOne({ email });

    if (cart) {
      const item = cart.items.find((item) => item._id.toString() === productId);

      if (item) {
        item.quantity = quantity;
        await cart.save();
        res.json(cart);
      } else {
        res.status(404).json({ error: "Product not found in cart" });
      }
    } else {
      res.status(404).json({ error: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating cart quantity" });
  }
};

// clear the cart of the user
const clearCart = async (req, res) => {
  try {
    const { email } = req.body;
    const cart = await Cart.findOne({ email });

    if (cart) {
      cart.items = [];

      await cart.save();
      res.json({ message: "Cart cleared successfully" });
    } else {
      res.status(404).json({ error: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error clearing cart" });
  }
};

export {
  getProductListings,
  orderProduct,
  cancelOrder,
  getOrders,
  getCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
};
