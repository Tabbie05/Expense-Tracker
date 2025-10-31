import express from "express";
import { addTransaction, getTransactions } from "../controllers/transactionController.js";

const router = express.Router();

// Routes
router.post("/", addTransaction);        // Add new transaction
router.get("/", getTransactions);        // Get all transactions

export default router;
