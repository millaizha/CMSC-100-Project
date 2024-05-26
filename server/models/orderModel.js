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
      count: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true, min: 0 },
      // helper field
      totalProductSales: { type: Number },
    },
  ],
  dateTimeOrdered: { type: Date, required: true, default: Date.now },
  status: {
    type: String,
    enum: ["in_cart", "pending", "confirmed", "canceled"],
    required: true,
  },
  // helper field
  totalOrderSales: { type: Number },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
