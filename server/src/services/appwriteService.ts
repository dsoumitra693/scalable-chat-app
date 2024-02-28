import { Client, Users, Account } from 'node-appwrite'
import { IUser } from '../Types/User';

// Init SDK
const client = new Client();


client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65a15630009d71dec34f')
    .setKey('47408f602632a23380695ba1e2f9313a778fd0d0143afcead39e5cb0ad266e7c92454f9be45c2b2c2f9134710c3723ebe899063012078019e483cb399f353143eb054a5d19ca36d2d749288e9d159cf3adb5318e346df6067596e889592a02c44b70a358c81301ec985cae6f02fded68219e37596c6e9da37ab360b95adc9f41')

const appwriteUsers = new Users(client);

const getAccount = async (jwt: string): Promise<IUser> => {
    client.setJWT(jwt)
    let account = new Account(client)

    let res = await account.get()

    return res
}

export { appwriteUsers, getAccount }