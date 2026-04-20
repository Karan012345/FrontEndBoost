import { useState } from "react";
import { getData, setData } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleReset = () => {
        setForm({ email: "", password: "" });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const email = form.email.trim().toLowerCase();
        const password = form.password.trim();

        if (!email || !password) {
            toast.error("All fields are required");
            return;
        }

        const users = getData("users");

        // 🔴 IMPORTANT: safe check
        if (!Array.isArray(users) || users.length === 0) {
            toast.error("No users found. Please register first.");
            return;
        }

        const user = users.find(u =>
            u.email?.toLowerCase() === email &&
            u.password === password
        );

        if (!user) {
            toast.error("Invalid email or password");
            return;
        }

        setData("currentUser", user);

        toast.success("Login successful");

        navigate("/dashboard"); // no timeout, no delay
    };

    return (
        <div className="min-h-screen flex">

            <div className="hidden md:flex w-1/2 bg-blue-900 text-white items-center justify-center text-3xl font-semibold">
                Bank Management System
            </div>

            <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">

                <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-80">

                    <h2 className="text-2xl font-bold mb-6 text-blue-900">Login</h2>

                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full mb-4 p-2 border rounded"
                        placeholder="Email"
                    />

                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full mb-4 p-2 border rounded"
                        placeholder="Password"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded"
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="w-full mt-2 bg-gray-500 text-white py-2 rounded"
                    >
                        Reset
                    </button>

                    <p className="text-sm mt-4 text-center">
                        Don't have an account?{" "}
                        <span
                            onClick={() => navigate("/register")}
                            className="text-blue-600 cursor-pointer font-medium"
                        >
                            Register
                        </span>
                    </p>

                </form>
            </div>
        </div>
    );
};

export default Login;