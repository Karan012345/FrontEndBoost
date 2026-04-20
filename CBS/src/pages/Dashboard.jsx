import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAccountContext } from "../context/AccountContext";
import { calculateBalance } from "../utils/balance";

const Dashboard = () => {
    const navigate = useNavigate();

    const { user, logout } = useAuth();
    const { account, loading } = useAccountContext();

    // ✅ Derived balance (single source of truth)
    const balance = calculateBalance();

    // ✅ Strong condition (avoid undefined issues)
    const hasAccount = account && account.userId;

    if (loading) {
        return <p className="p-6">Loading account...</p>;
    }

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <div className="bg-blue-900 text-white p-4 flex justify-between items-center">
                <h1 className="text-xl font-semibold">Bank Dashboard</h1>

                <div className="flex items-center gap-4">
                    <span>{user?.name}</span>

                    <button
                        onClick={() => navigate("/profile")}
                        className="bg-indigo-600 px-4 py-2 rounded"
                    >
                        Profile
                    </button>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">

                <h2 className="text-2xl font-bold mb-6">
                    Welcome, {user?.name}
                </h2>

                {/* Account Card */}
                <div className="bg-white p-6 rounded-xl shadow w-80">
                    <p className="text-gray-500">Account Type</p>

                    <h3 className="text-lg font-semibold text-blue-900">
                        {hasAccount ? account.type : "No Account"}
                    </h3>

                    <p className="text-gray-500 mt-4">Balance</p>

                    <h3 className="text-2xl font-bold text-green-600">
                        ₹ {hasAccount ? balance : 0}
                    </h3>

                    {/* ✅ Create Account */}
                    {!hasAccount && (
                        <button
                            onClick={() => navigate("/create-account")}
                            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-800"
                        >
                            Create Account
                        </button>
                    )}
                </div>

                {/* ✅ Actions */}
                {hasAccount && (
                    <div className="mt-6 flex gap-4">

                        <button
                            onClick={() => navigate("/deposite")}
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Deposit
                        </button>

                        <button
                            onClick={() => navigate("/withdraw")}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Withdraw
                        </button>

                        <button
                            onClick={() => navigate("/transactions")}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Transactions
                        </button>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;