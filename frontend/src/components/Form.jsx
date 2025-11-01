import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction, fetchTransactions } from "../app/transactionSlice";

function Form() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.transactions);

  const [selectedtype, setselectedtype] = useState("income");
  const [selectedcategory, setselectedcategory] = useState("");
  const [amount, setamount] = useState("");
  const [date, setdate] = useState("");

  const Categories = {
    income: [
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
    expense: [
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
    { id: "income", name: "Income" },
    { id: "expense", name: "Expense" },
  ];

  const categoryOptions = selectedtype
    ? Categories[selectedtype]
    : Categories["income"];

  // Fetch transactions on load
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  // Update selected category when type changes
  useEffect(() => {
    if (categoryOptions.length > 0) {
      setselectedcategory(categoryOptions[0]);
    }
  }, [selectedtype, categoryOptions]);

  // Calculate total balance
  const totalBalance = items.reduce((acc, t) => {
    return t.type.toLowerCase() === "income"
      ? acc + t.amount
      : acc - t.amount;
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !date) return alert("Please fill all fields");

    dispatch(
      createTransaction({
        type: selectedtype,
        category: selectedcategory,
        amount: Number(amount),
        date: new Date(date),
      })
    );

    // Reset form fields
    setamount("");
    setdate("");
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-4xl font-semibold text-gray-800 mb-2">
          Expense Tracker
        </h2>
        <p className="text-gray-500 font-bold mb-6">
          Now handle your expense with ease
        </p>
        <h1 className="text-2xl text-center mb-6">
          Total Balance: ${totalBalance}
        </h1>
        <hr className="border-gray-400 mb-6" />
        <form onSubmit={handleSubmit}>
          <p className="text-sm text-gray-800 ml-2">Type</p>
          <div className="mb-4 flex justify-between gap-4">
            <select
              className="block w-full bg-white border-b-2 border-blue-500 rounded-none px-3 py-2 appearance-none focus:outline-none focus:ring-0 text-black"
              value={selectedtype}
              onChange={(e) => {
                setselectedtype(e.target.value);
                setselectedcategory("");
              }}
            >
              {Type.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>

            <select
              className="block w-full bg-white border-b-2 border-blue-500 rounded-none px-3 py-2 appearance-none focus:outline-none focus:ring-0 text-black"
              value={selectedcategory}
              onChange={(e) => setselectedcategory(e.target.value)}
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
              className="block w-full bg-white border-b-2 border-blue-500 rounded-none px-3 py-2 appearance-none focus:outline-none focus:ring-0 text-black"
              value={amount}
              onChange={(e) => setamount(e.target.value)}
            />
            <input
              type="date"
              className="block w-full bg-white border-b-2 border-blue-500 rounded-none px-3 py-2 appearance-none focus:outline-none focus:ring-0 text-black"
              value={date}
              onChange={(e) => setdate(e.target.value)}
            />
          </div>

          <div className="flex justify-center mb-4 mt-6">
            <button
              className="border-2 border-blue-600 text-center p-1 w-full text-lg text-blue-600 rounded-sm"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>

        <div>
          {items.length === 0 ? (
            <p className="text-red-500 text-center">No transactions found.</p>
          ) : (
            <ul>
              {items.map((transaction, index) => (
                <li key={index} className="border-b border-gray-300 py-2">
                  <span className="font-semibold">{transaction.type} - </span>
                  <span>{transaction.category} : </span>
                  <span>${transaction.amount} </span>
                  <span>
                    on {new Date(transaction.date).toLocaleDateString()}
                  </span>
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
