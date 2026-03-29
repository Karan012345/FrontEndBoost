import { databases, ID } from "../lib/appwrite";
import conf from "../conf/conf";

// CREATE
export const createQuote = async (data) => {
    return await databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteQuotesCollectionId,
        ID.unique(),
        data
    );
};

// READ ALL
export const getQuotes = async () => {
    const response = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteQuotesCollectionId
    );
    return response.documents; // 🔥 important
};

// READ SINGLE
export const getQuoteById = async (id) => {
    return await databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteQuotesCollectionId,
        id
    );
};

// UPDATE
export const updateQuote = async (id, data) => {
    return await databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteQuotesCollectionId,
        id,
        data
    );
};

// DELETE
export const deleteQuote = async (id) => {
    return await databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteQuotesCollectionId,
        id
    );
};