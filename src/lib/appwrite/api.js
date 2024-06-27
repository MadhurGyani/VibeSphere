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
  
      return newAccount //newUser;
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
      const session = await account.createEmailSession(user.email, user.password);
      return session;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

