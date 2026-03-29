import { useNavigate, useLocation } from "react-router-dom";
import authService from "../services/authService"; // 👈 check path

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await authService.logout();   // 🔥 logout API
            navigate("/login");           // 🔥 redirect
        } catch (error) {
            console.error(error);
        }
    };

    const navItem = (path, label) => {
        const isActive = location.pathname === path;

        return (
            <button
                onClick={() => navigate(path)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition 
                ${isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-slate-800 hover:text-white"}`}
            >
                {label}
            </button>
        );
    };

    return (
        <div className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">

                <h1
                    onClick={() => navigate("/")}
                    className="font-semibold text-xl text-white cursor-pointer"
                >
                    Insurance<span className="text-blue-500">App</span>
                </h1>

                <div className="flex items-center gap-2">
                    {navItem("/", "Home")}
                    {navItem("/dashboard", "Dashboard")}
                    {navItem("/quote", "Add Quote")}
                    {navItem("/quotes", "Quotes")}

                    {/* 🔥 LOGOUT */}
                    <button
                        onClick={handleLogout}
                        className="ml-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Navbar;