import { ID, Client, Account } from 'appwrite'


const APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1",
  APPWRITE_PROJECT_ID = "65a15630009d71dec34f"

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

const account = new Account(client);


export const useRequestOtp = async <T>(phone: string) => {
  try {
    const sessionToken = await account.createPhoneSession(ID.unique(), '+91' + phone);
    const userId = sessionToken.userId;

    return userId as T
  } catch (error: any) {
    console.log(error)
    throw new Error(error)
  }
}

export const useVerifyOtp = async <T>(userId: string, otp: string) => {
  try {
    await account.updatePhoneSession(userId, otp);
    const response = await account.createJWT();
    console.log(response)
    return response as T
  } catch (error: any) {
    console.log(error)
    throw new Error(error)
  }
}