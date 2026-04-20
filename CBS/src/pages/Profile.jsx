import { useEffect, useState } from "react";
import { getData } from "../utils/storage";
import { calculateBalance } from "../utils/balance";

const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [filter, setFilter] = useState("All");

    // ✅ correct balance (single source of truth)
    const currentBalance = calculateBalance();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser"));

        if (!user) return;

        const allTx = getData("transactions") || [];

        // ✅ filter user transactions
        const userTx = allTx.filter(t => t.userId === user.id);

        // ❌ reverse removed (important for correct balance)
        setTransactions(userTx);
    }, []);

    // ✅ filter logic
    const filteredTransactions =
        filter === "All"
            ? transactions
            : transactions.filter(t => t.type === filter);

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-900">
                    Transaction History
                </h2>

                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="All">All</option>
                    <option value="Deposit">Deposit</option>
                    <option value="Withdraw">Withdraw</option>
                </select>
            </div>

            {/* ✅ Current Balance */}
            <div className="mb-6 bg-white p-5 rounded-xl shadow w-72">
                <p className="text-gray-500">Current Balance</p>
                <h3 className="text-2xl font-bold text-green-600 mt-2">
                    ₹ {currentBalance}
                </h3>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-blue-900 text-white">
                        <tr>
                            <th className="p-3">Type</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Available Balance</th>
                            <th className="p-3">Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredTransactions.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-4 text-center text-gray-500">
                                    No transactions found
                                </td>
                            </tr>
                        ) : (
                            (() => {
                                let runningBalance = 0;

                                return filteredTransactions.map(tx => {
                                    if (tx.type === "Deposit") {
                                        runningBalance += tx.amount;
                                    } else {
                                        runningBalance -= tx.amount;
                                    }

                                    return (
                                        <tr key={tx.id} className="border-b hover:bg-gray-50">

                                            {/* Type */}
                                            <td
                                                className={`p-3 font-semibold ${tx.type === "Deposit"
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                                    }`}
                                            >
                                                {tx.type}
                                            </td>

                                            {/* Amount */}
                                            <td className="p-3">₹ {tx.amount}</td>

                                            {/* ✅ Running Balance */}
                                            <td className="p-3 font-bold text-blue-900">
                                                ₹ {runningBalance}
                                            </td>

                                            {/* Date */}
                                            <td className="p-3 text-sm text-gray-500">
                                                {tx.date}
                                            </td>

                                        </tr>
                                    );
                                });
                            })()
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transaction;