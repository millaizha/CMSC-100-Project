import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  // product id is the _id
  name: { type: String, required: true, unique: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  type: { type: String },
  quantity: { type: Number, required: true, min: 0 },
  // the image url
  imageUrl: { type: String },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
