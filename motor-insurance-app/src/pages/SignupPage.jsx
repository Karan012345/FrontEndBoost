import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            await authService.createAccount({
                name,
                email,
                password,
            });

            alert("Signup successful");
            navigate("/login");
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-white/95 shadow-2xl backdrop-blur-md px-8 py-10 md:px-14 md:py-12 overflow-hidden">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 text-center">
                    Signup
                </h2>

                <form onSubmit={handleSignup} className="mt-10 flex flex-col gap-8">
                    <div className="space-y-3">
                        <label className="block text-lg font-semibold text-slate-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-[18px] border border-slate-300 bg-slate-50 px-5 py-4 text-lg text-slate-900 placeholder:text-slate-400 outline-none transition duration-200 focus:border-blue-500 focus:bg-white"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="block text-lg font-semibold text-slate-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-[18px] border border-slate-300 bg-slate-50 px-5 py-4 text-lg text-slate-900 placeholder:text-slate-400 outline-none transition duration-200 focus:border-blue-500 focus:bg-white"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="block text-lg font-semibold text-slate-700">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-[18px] border border-slate-300 bg-slate-50 px-5 py-4 text-lg text-slate-900 placeholder:text-slate-400 outline-none transition duration-200 focus:border-blue-500 focus:bg-white"
                        />
                    </div>

                    <div className="pt-2 flex justify-center">
                        <button
                            type="submit"
                            className="w-full sm:w-[210px] h-[56px] rounded-[16px] bg-blue-600 px-6 text-white font-semibold shadow-md transition hover:bg-blue-700 flex items-center justify-center"
                        >
                            Signup
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;