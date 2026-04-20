// utils/storage.js

export const getData = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.error("Error getting data:", err);
        return [];
    }
};

export const setData = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
        console.error("Error setting data:", err);
    }
};