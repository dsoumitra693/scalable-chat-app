import { IUser } from '../Types'
import axios, { AxiosRequestConfig } from 'axios'
import { serverUrl } from '../constants'

interface useUserReturnType {
    searchUser: (phoneNumbers: string[]) => Promise<IUser[]>
}

const useUser = (): useUserReturnType => {
    const searchUser = async (phoneNumbers: string[]) => {
        if (!Array.isArray(phoneNumbers) || phoneNumbers.length === 0) {
            throw new Error("Invalid phone numbers");
        }

        const config: AxiosRequestConfig = {
            url: `${serverUrl}/search`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer <token>'
            },
            data: { users: phoneNumbers },
            timeout: 5000 // Set a timeout of 5 seconds
        };

        try {
            const response = await axios.request(config);

            if (response.status === 200 && response.data && Array.isArray(response.data.users)) {
                return response.data.users as IUser[];
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return { searchUser };
};

export default useUser