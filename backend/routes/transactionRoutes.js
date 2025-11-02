import express from "express";
import { addTransaction, getTransactions,deleteTransaction,updateTransaction } from "../controllers/transactionController.js";

const router = express.Router();

// Routes
router.post("/", addTransaction);       
router.get("/", getTransactions);        
router.delete("/:id", deleteTransaction);
router.put("/:id",updateTransaction);


export default router;
