import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  // order id is _id
  name: { type: String, required: true },
  email: { type: String, required: true },
  products: [
    {
      // for referencing other info
      productId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Product",
      },
      name: { type: String, required: true },
      count: { type: Number, required: true },
      price: { type: Number, required: true },
      // helper field
      totalProductSales: { type: Number },
    },
  ],
  dateTimeOrdered: { type: Date, required: true, default: Date.now },
  // -1 = in cart
  // 0 = pending
  // 1 = completed
  // 2 = cancelled
  status: { type: Number, enum: [-1, 0, 1, 2], required: true },
  // helper field
  totalOrderSales: { type: Number },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
