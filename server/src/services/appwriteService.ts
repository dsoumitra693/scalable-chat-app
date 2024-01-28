import { Client, Users } from 'node-appwrite'

// Init SDK
const client = new Client();


client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65a15630009d71dec34f')
    .setKey('5505afc0ddbabacaad954f83880946009b702ac1a7b27cb5c2e71e9c08ffee9ff78dd3dc5f0c7cb2586bafdd8653f3e50f049e3c8642884e3a41468baa5b5b30fa5b95a251c84c9e130f0616422ca3da74516ee8c02754e051b81d9e35410bcf9fbedc2eecf1207246b17a8a12a6e52daeca5907a73a0422bb34a63ae5f57b72')

const appwriteUsers = new Users(client);

export { appwriteUsers }