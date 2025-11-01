import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import transactionRoutes from "./routes/transactionRoutes.js";
dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send("Expense Tracker API is running");
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
