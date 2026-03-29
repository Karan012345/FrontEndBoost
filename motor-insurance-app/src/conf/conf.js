const conf = {
    appwriteEndpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
    appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    appwriteQuotesCollectionId: import.meta.env.VITE_APPWRITE_QUOTES_COLLECTION_ID
};

export default conf;