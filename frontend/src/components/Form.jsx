import React from "react";

function Form() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-4xl font-semibold text-gray-800 mb-2">
          Expense Tracker
        </h2>
        <p className="text-gray-500 font-bold mb-6">
          Now handle your expense with ease
        </p>
        <h1 className="text-2xl text-center mb-6">Total Balance: </h1>
        <hr className="border-gray-400 mb-6" />
        <form>
          <p className="text-sm text-gray-800 ml-2">Type</p>
          <div className="mb-4 flex justify-between gap-4">
            <select
              className="
                block w-full
                bg-white
                border-b-2 border-blue-500
                rounded-none
                px-3 py-2
                appearance-none
                focus:outline-none
                focus:ring-0
                text-black
              "
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            {/* Second Select */}
            <select
              className="
                block w-full
                bg-white
                border-b-2 border-blue-500
                rounded-none
                px-3 py-2
                appearance-none
                focus:outline-none
                focus:ring-0
                text-black
              "
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="mb-4 flex justify-between ml-2 gap-4">
            <input
              type="number"
              placeholder="Amount"
              className="
                block w-full
                bg-white
                border-b-2 border-blue-500
                rounded-none
                px-3 py-2
                appearance-none
                focus:outline-none
                focus:ring-0
                text-black
              "
            />
            <input
              type="date"
              className="
                block w-full
                bg-white
                border-b-2 border-blue-500
                rounded-none
                px-3 py-2
                appearance-none
                focus:outline-none
                focus:ring-0
                text-black
              "
            />
          </div>
          <div className="flex justify-center mb-4 mt-6">
            <button className="border-2 border-blue-600 text-center p-1 w-full text-lg text-blue-600 rounded-sm ">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
