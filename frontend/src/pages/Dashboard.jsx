import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../app/transactionSlice";
import PieChart from "../components/PieChart";
import Form from '../components/Form'

function Dashboard() {
  const dispatch = useDispatch();
  const { items: transactions, loading, error } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type.toLowerCase() === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter(t => t.type.toLowerCase() === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  if (loading) return <p className="text-center mt-10 text-lg">Loading charts...</p>;
  if (error) return <p className="text-center mt-10 text-red-500 text-lg">{error}</p>;

  return (
    <div >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Income Chart */}
          <div className="lg:mt-29">
            <div className="bg-white rounded-xl shadow-lg p-6 border-b-4 border-green-500">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-3xl text-gray-800">Income</h2>
                <div className="text-right">
                  <p className="text-green-600 text-xl font-bold">
                    ${totalIncome.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="h-64 flex items-center justify-center">
                <PieChart transactions={transactions} type="Income" />
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <Form />
          </div>

          {/* Expense Chart */}
          <div className="lg:mt-29">
            <div className="bg-white rounded-xl shadow-lg p-6 border-b-4 border-red-500">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-3xl text-gray-800">Expense</h2>
                <div className="text-right">
                  <p className="text-red-600 text-xl font-bold">
                    ${totalExpense.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="h-64 flex items-center justify-center">
                <PieChart transactions={transactions} type="Expense" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;