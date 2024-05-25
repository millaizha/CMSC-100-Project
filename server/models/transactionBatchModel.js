import mongoose from "mongoose";

const transactionBatchSchema = new mongoose.Schema({
  // transactionBatch id is _id
  email: { type: String, required: true },
  // the list of transactions
  transactionList: [{ type: mongoose.Schema.ObjectId }],
  // date and time merged to one
  dateTimeOrdered: { type: Date, required: true, default: Date.now },
});

const TransactionBatch = mongoose.model(
  "TransactionBatch",
  transactionBatchSchema
);

export default TransactionBatch;
