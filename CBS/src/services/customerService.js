export const createCustomer = (data) => {
    const customers = JSON.parse(localStorage.getItem("customers")) || [];

    customers.push(data);

    localStorage.setItem("customers", JSON.stringify(customers));
};

export const getCustomers = () => {
    return JSON.parse(localStorage.getItem("customers")) || [];
};