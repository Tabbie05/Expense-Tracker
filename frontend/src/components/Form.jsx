import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction, updateTransaction, deleteTransaction } from "../app/transactionSlice";
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { MdDelete, MdEdit } from "react-icons/md";

function Form() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.transactions);

  const [selectedType, setSelectedType] = useState("Income");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    const formatted = today.toISOString().split("T")[0];
    return formatted;
  });
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const Categories = {
    Income: [
      "Business",
      "Investments",
      "Extra Income",
      "Deposits",
      "Lottery",
      "Gifts",
      "Salary",
      "Savings",
      "Rental Income",
    ],
    Expense: [
      "Bills",
      "Car",
      "Clothes",
      "Travel",
      "Food",
      "Shopping",
      "House",
      "Entertainment",
      "Phone",
      "Pets",
      "Other",
    ],
  };

  const Type = [
    { id: "Income", name: "Income" },
    { id: "Expense", name: "Expense" },
  ];

  const categoryOptions = Categories[selectedType] || [];

  useEffect(() => {
    if (categoryOptions.length > 0 && !isEditing) {
      setSelectedCategory(categoryOptions[0]);
    }
  }, [selectedType, isEditing]);

  const totalBalance = items.reduce((acc, t) => {
    const amt = Number(t.amount);
    return t.type === "Income" ? acc + amt : acc - amt;
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !date) return alert("Please fill all fields");

    if (isEditing) {
      // Update existing transaction
      dispatch(
        updateTransaction({
          id: editingId,
          transactionData: {
            type: selectedType,
            category: selectedCategory,
            amount: Number(amount),
            date: new Date(date),
          },
        })
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      // Create new transaction
      dispatch(
        createTransaction({
          type: selectedType,
          category: selectedCategory,
          amount: Number(amount),
          date: new Date(date),
        })
      );
    }

    // Reset form
    setAmount("");
    setDate(new Date().toISOString().split("T")[0]);
    setSelectedType("Income");
    setSelectedCategory(Categories.Income[0]);
  };

  const handleEdit = (transaction) => {
    setIsEditing(true);
    setEditingId(transaction._id);
    setSelectedType(transaction.type);
    setSelectedCategory(transaction.category);
    setAmount(transaction.amount.toString());
    setDate(new Date(transaction.date).toISOString().split("T")[0]);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    setAmount("");
    setDate(new Date().toISOString().split("T")[0]);
    setSelectedType("Income");
    setSelectedCategory(Categories.Income[0]);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      dispatch(deleteTransaction(id));
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[500px] max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-4xl font-semibold text-gray-800 mb-2">
          Expense Tracker
        </h2>
        <p className="text-gray-500 font-bold mb-6">
          Now handle your expense with ease
        </p>

        <h1
          className={`text-2xl text-center mb-6 font-bold ${
            totalBalance < 0 ? "text-red-600" : "text-black"
          }`}
        >
          Total Balance: ${totalBalance.toFixed(2)}
        </h1>

        <hr className="border-gray-400 mb-6" />

        <form onSubmit={handleSubmit}>
          {isEditing && (
            <div className="mb-4 p-2 bg-blue-50 border-l-4 border-blue-500 text-blue-700">
              <p className="font-semibold">Editing Transaction</p>
            </div>
          )}

          <p className="text-sm text-gray-800 ml-2">Type</p>
          <div className="mb-4 flex justify-between gap-4">
            <select
              className="block w-full bg-white border-b-2 border-blue-500 px-3 py-2 appearance-none focus:outline-none focus:ring-0 text-black"
              value={selectedType}
              onChange={(e) => {
                const newType = e.target.value;
                setSelectedType(newType);
                const firstCategory = Categories[newType]?.[0] || "";
                setSelectedCategory(firstCategory);
              }}
            >
              {Type.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>

            <select
              className="block w-full bg-white border-b-2 border-blue-500 px-3 py-2 appearance-none focus:outline-none focus:ring-0 text-black"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 flex justify-between ml-2 gap-4">
            <input
              type="number"
              placeholder="Amount"
              className="block w-full bg-white border-b-2 border-blue-500 px-3 py-2 appearance-none focus:outline-none focus:ring-0 text-black"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              type="date"
              className="block w-full bg-white border-b-2 border-blue-500 px-3 py-2 appearance-none focus:outline-none focus:ring-0 text-black"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="flex justify-center gap-2 mb-4 mt-6">
            <button
              className="border-2 border-blue-600 text-center p-1 w-full text-lg text-blue-600 rounded-sm hover:bg-blue-600 hover:text-white transition-all"
              type="submit"
            >
              {isEditing ? "Update" : "Create"}
            </button>
            {isEditing && (
              <button
                className="border-2 border-gray-400 text-center p-1 w-full text-lg text-gray-600 rounded-sm hover:bg-gray-400 hover:text-white transition-all"
                type="button"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="mt-6">
          {loading && <p className="text-center text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && items.length === 0 ? (
            <p className="text-red-500 text-center">No transactions found.</p>
          ) : (
            <ul className="max-h-96 overflow-y-auto">
              {items.map((transaction) => (
                <li key={transaction._id} className="border-b border-gray-300 py-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <HiMiniCurrencyDollar
                        size={35}
                        className={`${
                          transaction.type.toLowerCase() === "income"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      />
                      <div className="flex flex-col ml-3">
                        <div className="font-semibold text-xl">
                          {transaction.category}
                        </div>
                        <div className="text-gray-600">
                          ${transaction.amount} -{" "}
                          {new Date(transaction.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="hover:text-blue-600 transition-colors"
                        onClick={() => handleEdit(transaction)}
                      >
                        <MdEdit size={30} />
                      </button>
                      <button
                        className="hover:text-red-600 transition-colors"
                        onClick={() => handleDelete(transaction._id)}
                      >
                        <MdDelete size={30} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Form;