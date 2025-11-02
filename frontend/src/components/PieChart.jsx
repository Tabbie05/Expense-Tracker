import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ transactions, type }) => {
  if (!transactions) return null;

  if (!Array.isArray(transactions)) {
    console.error("transactions is not an array:", transactions);
    return null;
  }

  const filteredTransactions = transactions.filter(
    (t) => t?.type?.toLowerCase() === type.toLowerCase()
  );

  if (filteredTransactions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 text-sm">No {type.toLowerCase()} data</p>
      </div>
    );
  }

  const categories = [...new Set(filteredTransactions.map((t) => t.category))];

  const amounts = categories.map((cat) =>
    filteredTransactions
      .filter((t) => t.category === cat)
      .reduce((sum, t) => sum + Number(t.amount), 0)
  );

  // Color schemes based on type
  const incomeColors = [
    "#10B981", "#059669", "#34D399", "#6EE7B7", "#A7F3D0", 
    "#047857", "#065F46", "#14B8A6", "#2DD4BF", "#5EEAD4"
  ];

  const expenseColors = [
    "#EF4444", "#DC2626", "#F87171", "#FCA5A5", "#FECACA",
    "#B91C1C", "#991B1B", "#F97316", "#FB923C", "#FDBA74"
  ];

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: `${type}`,
        data: amounts,
        backgroundColor: type.toLowerCase() === 'income' ? incomeColors : expenseColors,
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 10,
          font: {
            size: 11
          },
          boxWidth: 12,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.label + ': $' + context.parsed.toFixed(2);
          }
        }
      }
    },
  };

  return (
    <div className="w-full max-w-[240px] mx-auto">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;