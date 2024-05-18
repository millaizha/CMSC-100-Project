import Product from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const {
      productId,
      name,
      description = null,
      price,
      type,
      quantity,
    } = req.body;
    const newProduct = new Product({
      productId,
      name,
      description,
      price,
      type,
      quantity,
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
 *  sortOption: {<key>: <asc or desc>}
 * }
 *
 * <key> can be "name", "type", "price", or "quantity"
 * <asc or desc>: 1 for ascending, -1 for descending
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

export { addProduct, getProductListings };
