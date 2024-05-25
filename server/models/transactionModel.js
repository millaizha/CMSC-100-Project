import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  // transaction id is _id
  productId: { type: mongoose.Schema.ObjectId, required: true },
  quantity: { type: Number, required: true },
  // -1 = in cart
  // 0 = pending
  // 1 = completed
  // 2 = cancelled
  status: { type: Number, enum: [-1, 0, 1, 2], required: true },
  email: { type: String, required: true },
  // helpful parameters for easier computation
  productPrice: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  // date and time merged to one
  dateTimeOrdered: { type: Date, required: true, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
