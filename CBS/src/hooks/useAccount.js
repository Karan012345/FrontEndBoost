import { useState, useEffect } from "react";
import { getData } from "../utils/storage";

export const useAccount = () => {
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            try {
                const currentUser = JSON.parse(localStorage.getItem("currentUser"));

                if (!currentUser) {
                    throw new Error("User not found");
                }

                const accounts = getData("accounts") || [];
                const userAccount = accounts.find(
                    (a) => a.userId === currentUser.id
                );

                if (!userAccount) {
                    setAccount(null); // no account case
                } else {
                    setAccount(userAccount);
                }

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }, 800);
    }, []);

    return { account, loading, error };
};