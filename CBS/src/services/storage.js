export const setData = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error("Error saving data:", error);
    }
};

export const getAccount = () => {
    try {
        const data = localStorage.getItem("account");
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Error reading account:", error);
        return null;
    }
};

export const updateBalance = (amount) => {
    try {
        const acc = getAccount();

        if (!acc) {
            console.error("No account found");
            return;
        }

        if (typeof amount !== "number" || isNaN(amount)) {
            console.error("Invalid amount");
            return;
        }

        acc.balance = (acc.balance || 0) + amount;

        localStorage.setItem("account", JSON.stringify(acc));
    } catch (error) {
        console.error("Error updating balance:", error);
    }
};

export const getData = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error parsing data:", error);
        return [];
    }
};



