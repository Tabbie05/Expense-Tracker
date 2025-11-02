import { Transaction } from "../models/transactionModel.js";

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

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Transaction.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Transaction not found" });
    res.status(200).json({ id }); // return deleted id
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, category, amount, date } = req.body;
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { type, category, amount, date },
      { new: true }
    );    
    if (!updatedTransaction) return res.status(404).json({ message: "Transaction not found" });
    res.status(200).json(updatedTransaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }   
};

