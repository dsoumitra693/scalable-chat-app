import { Client, Users, Account } from 'node-appwrite'
import { IUser } from '../Types/User';

// Init SDK
const client = new Client();


client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65a15630009d71dec34f')
    .setKey('89af6bfce16412bf8d896983e470c0f21082add092d2e1ea7b8dd8c3ad9a11b12d453683d5c6e2d7ec30d7896e535de0c3be5af710ae2418e9587a8c566fd73335e8cb82eb3919d5142f49f076894f34653809dbb83ee883f67595d66a9cd5076d033545d39ef33f82de84a31324235c1bc8f2229320cc7f46df88a6a06176e2')

const appwriteUsers = new Users(client);

const getAccount = async (jwt: string): Promise<IUser> => {
    client.setJWT(jwt)
    let account = new Account(client)

    let res = await account.get()

    return res
}

export { appwriteUsers, getAccount }