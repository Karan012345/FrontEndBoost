import { useState } from "react";
import { getData, setData } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CustomerFormPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // ✅ RESET FUNCTION
    const handleReset = () => {
        setForm({
            name: "",
            email: "",
            password: ""
        });
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isStrongPassword = (password) => {
        return /^(?=.*[0-9]).{6,}$/.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const name = form.name.trim();
        const email = form.email.trim().toLowerCase();
        const password = form.password.trim();

        if (!name || !email || !password) {
            toast.error("All fields are required");
            return;
        }

        if (!isValidEmail(email)) {
            toast.error("Invalid email format");
            return;
        }

        if (!isStrongPassword(password)) {
            toast.error("Password must be 6+ chars & include a number");
            return;
        }

        let users = getData("users") || [];

        const exists = users.find(u => u.email === email);
        if (exists) {
            toast.error("User already exists");
            return;
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            password
        };

        users.push(newUser);
        setData("users", users);


        let accounts = getData("accounts") || [];

        const newAccount = {
            userId: newUser.id,
            balance: 0,
            type: "Savings"
        };

        accounts.push(newAccount);
        setData("accounts", accounts);

        toast.success("Registered Successfully");

        handleReset();
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex">

            {/* Left Panel */}
            <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-900 to-blue-600 text-white items-center justify-center text-3xl font-semibold">
                Create Account
            </div>

            {/* Right Panel */}
            <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-80">

                    <h2 className="text-2xl font-bold mb-6 text-blue-900">Register</h2>

                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full mb-4 p-2 border rounded"
                        placeholder="Name"
                    />

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
                        Register
                    </button>

                    {/* ✅ RESET BUTTON */}
                    <button
                        type="button"
                        onClick={handleReset}
                        className="w-full mt-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-700"
                    >
                        Reset
                    </button>

                </form>
            </div>
        </div>
    );
};

export default CustomerFormPage;