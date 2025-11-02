# 🧾 Expense Tracker Application

A full-stack **Expense Tracker** application built with the **MERN (MongoDB, Express, React, Node.js)** stack.  
This project allows users to **add, edit, delete, and view** their income and expenses with a clean, modern UI and real-time balance summary.

---

## 🚀 Objective

To develop a responsive and data-driven web application that helps users manage their financial transactions efficiently by tracking **income** and **expenses** with proper categorization, visualization, and CRUD functionalities.

---

## 🏗️ Tech Stack

### **Frontend**
- ⚛️ **React.js**
- 🎨 **Tailwind CSS**
- 🧰 **Redux Toolkit** (for global state management)
- 📅 **React Icons** (for UI icons)

### **Backend**
- 🟢 **Node.js**
- ⚙️ **Express.js** (RESTful API)
- 🍃 **MongoDB** (Database)
- 🧾 **Mongoose** (ORM for MongoDB)

---

## 📁 Folder Structure

Expense-Tracker/
│
├── backend/
│ ├── server.js
│ ├── routes/
│ │ └── transactionRoutes.js
│ ├── controllers/
│ │ └── transactionController.js
│ ├── models/
│ │ └── TransactionModel.js
│ └── config/
│ └── db.js
│
├── frontend/
│ ├── src/
│ │ ├── app/
│ │ │ ├── store.js
│ │ │ └── transactionSlice.js
│ │ ├── components/
│ │ │ ├── Form.jsx
│ │ │ └── PieChart.jsx
│ │ ├── App.jsx
│ │ └── index.js
│ ├── package.json
│ └── tailwind.config.js
│
├── README.md
└── package.json


---

## ⚙️ Features

- ➕ **Add**, ✏️ **Edit**, and 🗑️ **Delete** transactions  
- 💰 **Real-time balance calculation**  
- 📊 **Interactive Pie/Bar Charts** for income vs. expenses  
- 🧭 **Filter by type and category**  
- ⚙️ **CRUD operations** via RESTful API  
- 🎨 **Clean, responsive UI** built with Tailwind CSS  

---

## 🧮 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/transactions` | Fetch all transactions |
| POST | `/api/transactions` | Create a new transaction |
| PUT | `/api/transactions/:id` | Update an existing transaction |
| DELETE | `/api/transactions/:id` | Delete a transaction |

### 🗂️ Transaction Schema

```js
{
  type: String, // "Income" or "Expense"
  category: String,
  amount: Number,
  date: Date
}

🧰 Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker

2️⃣ Setup Backend
cd backend
npm install


Create a .env file inside the backend folder:

MONGO_URI=your_mongodb_connection_string
PORT=5000


Run the server:

npm i
npm start


Server runs at 👉 http://localhost:5000

3️⃣ Setup Frontend
cd frontend
npm install
npm start


Frontend runs at 👉 http://localhost:3000
