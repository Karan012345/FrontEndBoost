import { createContext, useContext, useState, useEffect } from "react";
import { getData, setData } from "../utils/storage";
import { useAuth } from "./AuthContext";

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth(); // ✅ critical fix

    // ✅ Fetch account based on logged-in user
    const fetchAccount = () => {
        if (!user) {
            setAccount(null);
            setLoading(false);
            return;
        }

        const accounts = getData("accounts") || [];

        const userAccount = accounts.find(
            (acc) => acc.userId === user.id
        );

        setAccount(userAccount || null);
        setLoading(false);
    };

    // ✅ Create account if not exists (important for new users)
    const createAccount = () => {
        if (!user) return;

        const accounts = getData("accounts") || [];

        const existing = accounts.find(
            (acc) => acc.userId === user.id
        );

        if (existing) {
            setAccount(existing);
            return;
        }

        const newAccount = {
            userId: user.id,
            balance: 0,
            type: "Savings"
        };

        const updatedAccounts = [...accounts, newAccount];
        setData("accounts", updatedAccounts);

        setAccount(newAccount);
    };

    // ✅ Deposit
    const deposit = (amount) => {
        if (!account || amount <= 0) return;

        const updatedAccount = {
            ...account,
            balance: account.balance + amount
        };

        updateAccount(updatedAccount);
    };

    // ✅ Withdraw
    const withdraw = (amount) => {
        if (!account || amount <= 0) return;

        if (amount > account.balance) {
            alert("Insufficient balance");
            return;
        }

        const updatedAccount = {
            ...account,
            balance: account.balance - amount
        };

        updateAccount(updatedAccount);
    };

    // ✅ Update account in storage
    const updateAccount = (updatedAccount) => {
        const accounts = getData("accounts") || [];

        const updatedAccounts = accounts.map((acc) =>
            acc.userId === updatedAccount.userId ? updatedAccount : acc
        );

        setData("accounts", updatedAccounts);
        setAccount(updatedAccount);
    };

    // 🔥 MAIN FIX: runs when user changes
    useEffect(() => {
        setLoading(true);

        if (user) {
            fetchAccount();
        } else {
            setAccount(null);
            setLoading(false);
        }
    }, [user]);

    return (
        <AccountContext.Provider
            value={{
                account,
                loading,
                fetchAccount,
                createAccount,
                deposit,
                withdraw
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

// ✅ Custom hook
export const useAccountContext = () => {
    const context = useContext(AccountContext);
    if (!context) {
        throw new Error("useAccountContext must be used within AccountProvider");
    }
    return context;
};