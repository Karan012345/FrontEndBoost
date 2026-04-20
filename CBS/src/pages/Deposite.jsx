import { useState } from "react";
import { getData, setData } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Deposite = () => {
    const [amount, setAmount] = useState("");
    const navigate = useNavigate();

    const handleDeposit = () => {
        const user = JSON.parse(localStorage.getItem("currentUser"));

        if (!user) {
            toast.error("User not logged in");
            return;
        }

        let accounts = getData("accounts") || [];

        const accIndex = accounts.findIndex(a => a.userId === user.id);

        if (accIndex === -1) {
            toast.error("No account found");
            return;
        }

        if (!amount || Number(amount) <= 0) {
            toast.error("Enter valid amount");
            return;
        }

        // ✅ ONLY transactions (single source of truth)
        let transactions = getData("transactions") || [];

        transactions.push({
            id: Date.now(),
            userId: user.id,
            type: "Deposit",
            amount: Number(amount),
            date: new Date().toLocaleString()
        });

        setData("transactions", transactions);

        toast.success("Amount deposited");

        setAmount("");

        setTimeout(() => {
            navigate("/dashboard");
        }, 500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow w-80">

                <h2 className="text-xl font-bold mb-4 text-blue-900">
                    Deposit Money
                </h2>

                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full mb-4 p-2 border rounded"
                />

                <button
                    onClick={handleDeposit}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-800"
                >
                    Deposit
                </button>

            </div>
        </div>
    );
};

export default Deposite;