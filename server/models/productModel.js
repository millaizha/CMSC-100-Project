import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  // distinct from the already existing  _id key
  productId: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  description: { type: String },
  price: { type: Number, required: true },
  type: { type: Number, enum: [1, 2], required: true },
  quantity: { type: Number, required: true },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
