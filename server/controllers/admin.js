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

export { addProduct };
