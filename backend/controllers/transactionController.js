import { Transaction } from "../models/transactionModel.js";

// Create a new transaction
export const addTransaction = async (req, res) => {
  try {
    const { type, category, amount, date } = req.body;

    const newTransaction = new Transaction({
      type,
      category,
      amount,
      date,
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
