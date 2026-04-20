import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // ✅ Load user on app start
    useEffect(() => {
        try {
            const storedUser = JSON.parse(localStorage.getItem("currentUser"));
            if (storedUser) {
                setUser(storedUser);
            }
        } catch (err) {
            console.error("Invalid user data in localStorage");
            localStorage.removeItem("currentUser");
        }
    }, []);

    // ✅ Login
    const login = (userData) => {
        if (!userData || !userData.id) {
            console.error("Invalid login data");
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(userData));
        setUser(userData);
    };

    // ✅ Logout
    const logout = () => {
        localStorage.removeItem("currentUser");
        setUser(null);
    };

    // ✅ Optional: Update user (useful for profile changes)
    const updateUser = (updatedData) => {
        const newUser = { ...user, ...updatedData };
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        setUser(newUser);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// ✅ Custom hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
};