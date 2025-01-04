import { Client, Account, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')  // Update with your Appwrite endpoint
  .setProject('sportdunia');  // Update with your project ID

export const account = new Account(client);
export const databases = new Databases(client);

export const COLLECTION_ID = 'articles';
export const DATABASE_ID = 'sportdunia';