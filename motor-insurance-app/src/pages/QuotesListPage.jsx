import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuotes, deleteQuote } from "../services/quoteService";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";

function QuotesListPage() {
    const [quotes, setQuotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 🔥 SINGLE API CALL
    useEffect(() => {
        loadQuotes();
    }, []);

    const loadQuotes = async () => {
        try {
            setLoading(true);
            const res = await getQuotes();

            // console.log("API DATA:", res);

            // 🔥 IMPORTANT (your service already returns documents)
            setQuotes(res || []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load quotes");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteQuote(id);
            toast.success("Quote deleted successfully");
            loadQuotes();
        } catch (error) {
            console.error(error);
            toast.error("Delete failed");
        }
    };

    // 🔥 FIXED FILTER
    const filteredQuotes = (quotes || []).filter((q) => {
        if (!searchTerm) return true;

        return (
            q.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.vehicleNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.city?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center px-4 py-10">

                <div className="w-full max-w-5xl bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 min-h-[250px]">

                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">

                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">Saved Quotes</h2>
                            <p className="text-slate-500 text-sm">Manage insurance quotes</p>
                        </div>

                        <div className="flex gap-3">
                            {/* 🔥 SEARCH */}
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>
                    </div>

                    {/* LOADER */}
                    {loading ? (
                        <p className="text-center py-10 text-gray-500 text-lg font-medium">
                            Loading...
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left border-collapse overflow-hidden rounded-xl">

                                <thead className="bg-slate-900 text-white">
                                    <tr>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Vehicle</th>
                                        <th className="px-4 py-3">City</th>
                                        <th className="px-4 py-3">Insurance</th>
                                        <th className="px-4 py-3">Premium</th>
                                        <th className="px-4 py-3 text-center">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredQuotes.length > 0 ? (
                                        filteredQuotes.map((q) => (
                                            <tr key={q.$id} className="border-b hover:bg-slate-100 transition">

                                                <td className="px-4 py-3 font-medium text-slate-800">
                                                    {q.fullName}
                                                </td>

                                                <td className="px-4 py-3">
                                                    {q.vehicleNumber}
                                                </td>

                                                <td className="px-4 py-3">
                                                    {q.city}
                                                </td>

                                                <td className="px-4 py-3 capitalize">
                                                    {q.insuranceType}
                                                </td>

                                                <td className="px-4 py-3 text-green-600 font-semibold">
                                                    ₹{q.premium}
                                                </td>

                                                <td className="px-4 py-3">
                                                    <div className="flex gap-3 justify-center">

                                                        <button
                                                            onClick={() => navigate(`/edit/${q.$id}`)}
                                                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            onClick={() => handleDelete(q.$id)}
                                                            className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition"
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>
                                                </td>

                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-6 text-gray-500">
                                                No matching results found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="flex justify-between items-center mt-4 text-sm text-slate-600">
                        <span>
                            Showing {filteredQuotes.length} of {(quotes || []).length} records
                        </span>
                    </div>

                </div>
            </div>

        </>

    );
}

export default QuotesListPage;