import { Client, Account, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT || '')  // Use the environment variable
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID || '');  // Use the environment variable

export const account = new Account(client);
export const databases = new Databases(client);

export const COLLECTION_ID = 'articles';
export const DATABASE_ID = 'sportdunia';
