import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  // distinct from the already existing  _id key
  transactionId: { type: String, required: true, unique: true },
  productId: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  status: { type: Number, enum: [0, 1, 2], required: true },
  email: { type: String, required: true },
  // date and time merged to one
  dateTimeOrdered: { type: Date, required: true, default: Date.now },
});

const transaction = mongoose.model("transaction", transactionSchema);

export default transaction;
