import { Routes, Route, Navigate } from "react-router-dom";
import CustomerFormPage from "./pages/CustomerFormPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateAccount from "./pages/CreateAccount";
import Deposite from "./pages/Deposite";
import Withdraw from "./pages/Withdraw";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <>
            <Toaster position="top-right" />

            <Routes>
                <Route
                    path="/"
                    element={
                        localStorage.getItem("currentUser")
                            ? <Navigate to="/dashboard" />
                            : <Navigate to="/login" />
                    }
                />

                <Route path="/login" element={<Login />} />

                {/* Decide ONE */}
                <Route path="/register" element={<CustomerFormPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/deposite" element={<Deposite />} />
                <Route path="/withdraw" element={<Withdraw />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/create-account" element={<CreateAccount />} />
            </Routes>
        </>
    );
}

export default App;