import { useEffect, useState } from "react";
import authService from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function HomePage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                setUser(null);
            }
        };

        getUser();
    }, []);

    const handleLogout = async () => {
        try {
            await authService.logout();
            setUser(null);
            alert("Logout successful");
            navigate("/login");
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (

        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-3xl min-h-[400px] rounded-[28px] border border-white/10 bg-white/95 shadow-2xl backdrop-blur-md px-8 py-10 md:px-12 md:py-14 text-center flex flex-col justify-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
                        Motor Insurance App
                    </h1>
                    <br />
                    {user ? (
                        <div className="mt-10 flex flex-col items-center justify-center gap-8">
                            <div className="mx-auto flex w-full max-w-2xl items-center justify-center rounded-[18px] border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 px-6 py-5 shadow-sm">
                                <p className="text-center text-lg md:text-xl font-semibold text-slate-800 leading-relaxed">
                                    Welcome,{" "}
                                    <span className="text-emerald-700">{user.name}</span>
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                                <Link
                                    to="/quote"
                                    className="w-full sm:w-[210px] rounded-[16px] bg-slate-900 px-6 py-4 text-white font-semibold shadow-md transition hover:bg-slate-800 text-center"
                                >
                                    Create Quote
                                </Link>

                                <Link
                                    to="/quotes"
                                    className="w-full sm:w-[210px] rounded-[16px] bg-blue-600 px-6 py-4 text-white font-semibold shadow-md transition hover:bg-blue-700 text-center"
                                >
                                    View Quotes
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="w-full sm:w-[210px] rounded-[16px] bg-rose-600 px-6 py-4 text-white font-semibold shadow-md transition hover:bg-rose-700"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-10 flex flex-col items-center justify-center gap-8">
                            <div className="mx-auto flex w-full max-w-2xl items-center justify-center rounded-[18px] border border-blue-100 bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-5 shadow-sm">
                                <p className="text-center text-lg md:text-xl font-semibold text-slate-700 leading-relaxed">
                                    Please login or create an account to continue...
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                                <Link
                                    to="/login"
                                    className="w-full sm:w-[210px] h-[40px] rounded-[16px] bg-slate-900 px-6 text-white font-semibold shadow-md transition hover:bg-slate-800 text-center flex items-center justify-center"                            >
                                    Login
                                </Link>

                                <Link
                                    to="/signup"
                                    className="w-full sm:w-[210px] h-[40px] rounded-[16px] bg-blue-600 px-6 text-white font-semibold shadow-md transition hover:bg-blue-700 text-center flex items-center justify-center"                            >
                                    Signup
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>



    );
}

export default HomePage;