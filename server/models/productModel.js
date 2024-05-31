import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  // product id is the _id
  name: { type: String, required: true, unique: true },
  description: { type: String },
  price: { type: Number, required: true },
  type: { type: Number, enum: [1, 2], required: true },
  quantity: { type: Number, required: true },
  // the image url
  imageUrl: { type: String },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
