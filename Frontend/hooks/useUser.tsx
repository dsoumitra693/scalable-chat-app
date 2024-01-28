import { IUser } from '../Types'
import axios from 'axios'
import { serverUrl } from '../constants'

interface useUserReturnType {
    searchUser: (phoneNumbers: string[]) => Promise<IUser[]>
}


const useUser = (): useUserReturnType => {
    const searchUser = async (phoneNumbers: string[]) => {

        let response = await axios.request({
            url: `${serverUrl}/search`,
            method: "POST",
            data: {users: phoneNumbers},
        });
        console.log(response.data);

        return response.data.users as IUser[]
    }

    return { searchUser }
}

export default useUser