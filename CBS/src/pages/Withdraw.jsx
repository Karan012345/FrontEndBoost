import { useState } from "react";
import { getData, setData } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { calculateBalance } from "../utils/balance";

const Withdraw = () => {
    const [amount, setAmount] = useState("");
    const navigate = useNavigate();

    const handleWithdraw = () => {
        const user = JSON.parse(localStorage.getItem("currentUser"));

        if (!user) {
            toast.error("User not logged in");
            return;
        }

        // ✅ Get balance from transactions
        const currentBalance = calculateBalance();

        if (!amount || Number(amount) <= 0) {
            toast.error("Enter valid amount");
            return;
        }

        if (Number(amount) > currentBalance) {
            toast.error("Insufficient balance");
            return;
        }

        let transactions = getData("transactions") || [];

        transactions.push({
            id: Date.now(),
            userId: user.id,
            type: "Withdraw",
            amount: Number(amount),
            date: new Date().toLocaleString()
        });

        setData("transactions", transactions);

        toast.success("Withdrawal successful");

        setAmount("");

        setTimeout(() => {
            navigate("/dashboard");
        }, 500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow w-80">

                <h2 className="text-xl font-bold mb-4 text-red-600">
                    Withdraw Money
                </h2>

                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full mb-4 p-2 border rounded"
                />

                <button
                    onClick={handleWithdraw}
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-800"
                >
                    Withdraw
                </button>

            </div>
        </div>
    );
};

export default Withdraw;