import { useEffect, useState } from "react";
import { getQuotes } from "../services/quoteService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


function DashboardPage() {
    const [quotes, setQuotes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await getQuotes();
            setQuotes(data);
        } catch (error) {
            console.error(error);
        }
    };

    // 🔥 STATS
    const totalQuotes = quotes.length;
    const totalPremium = quotes.reduce((sum, q) => sum + (q.premium || 0), 0);
    const avgPremium = totalQuotes ? Math.round(totalPremium / totalQuotes) : 0;
    const maxPremium = quotes.length
        ? Math.max(...quotes.map((q) => q.premium || 0))
        : 0;

    const recentQuotes = quotes.slice(-5).reverse();

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Dashboard</h1>

                    <button
                        onClick={() => navigate("/quote")}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        + New Quote
                    </button>
                </div>

                {/* 🔥 STATS CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="bg-white rounded-xl p-6 shadow-lg">
                        <p className="text-gray-500">Total Quotes</p>
                        <h2 className="text-3xl font-bold">{totalQuotes}</h2>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg">
                        <p className="text-gray-500">Average Premium</p>
                        <h2 className="text-3xl font-bold text-blue-600">
                            ₹{avgPremium}
                        </h2>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg">
                        <p className="text-gray-500">Highest Premium</p>
                        <h2 className="text-3xl font-bold text-green-600">
                            ₹{maxPremium}
                        </h2>
                    </div>

                </div>

                {/* 🔥 RECENT QUOTES */}
                <div className="mt-10 bg-white rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Recent Quotes</h3>

                    {recentQuotes.length > 0 ? (
                        <div className="space-y-3">
                            {recentQuotes.map((q) => (
                                <div
                                    key={q.$id}
                                    className="flex justify-between items-center border-b pb-2"
                                >
                                    <div>
                                        <p className="font-medium">{q.fullName}</p>
                                        <p className="text-sm text-gray-500">
                                            {q.vehicleNumber} • {q.city}
                                        </p>
                                    </div>

                                    <p className="font-semibold text-green-600">
                                        ₹{q.premium}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No data available</p>
                    )}
                </div>

                {/* 🔥 QUICK ACTIONS */}
                <div className="mt-8 flex gap-4">
                    <button
                        onClick={() => navigate("/quotes")}
                        className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
                    >
                        View All Quotes
                    </button>
                </div>

            </div>
        </>
    );
}

export default DashboardPage;