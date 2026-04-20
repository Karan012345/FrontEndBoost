export const calculateBalance = () => {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    return transactions.reduce((acc, txn) => {
        if (txn.type === "Deposit") return acc + txn.amount;
        if (txn.type === "Withdraw") return acc - txn.amount;
        return acc;
    }, 0);
};