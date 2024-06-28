import { ID, Query } from "appwrite";
import { appwriteConfig, account, databases, storage, avatars } from "./config";

// ************************************************ SIGN UP
export async function createUserAccount(user) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw new Error("Account creation failed");

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newAccount; //newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// ****************************************** SAVE USER TO DB
export async function saveUserToDB(user) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// ************************************* SIGN IN

export async function signInAccount(user) {
  try {
    const session = await account.createEmailPasswordSession(user.email, user.password);
    return session;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// ************************************* GET ACCOUNT

// ************************************* GET CURRENT USER

export async function getCurrentUser() {
  try {
    // Get the current account information
    const currentAccount = await account.get();

    // If no current account is found, throw an error
    if (!currentAccount) throw new Error("Account not found");

    // Fetch the user information from the database using the account ID
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId, // Database ID from your config
      appwriteConfig.userCollectionId, // Collection ID from your config
      [Query.equal("accountId", currentAccount.$id)] // Query to find documents with the matching account ID
    );

    // If no user documents are found, throw an error
    if (!currentUser || currentUser.documents.length === 0)
      throw new Error("User not found");

    // Return the first user document
    return currentUser.documents[0];
  } catch (error) {
    // Log any errors to the console
    console.log(error);
    return null;
  }
}

//**************************************** SIGNOUT ACCOUNT
export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.error(error);
    throw error;
  }
}