import mongoose from "mongoose";

const transactionSchemea = mongoose.Schema({
  type: {
    type: String,
    enum: ["Income", "Expense"],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },

});

export const Transaction = mongoose.model("Transaction", transactionSchemea);
