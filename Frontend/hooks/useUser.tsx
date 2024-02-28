import { IUser } from '../Types'
import axios from 'axios'
import { serverUrl } from '../constants'

interface useUserReturnType {
    searchUser: (phoneNumbers: string[]) => Promise<IUser[]>
}

const useUser = (): useUserReturnType => {
    const searchUser = async (phoneNumbers: string[]) => {

        // console.log(phoneNumbers)
        let response = await axios.request({
            url: `${serverUrl}/search`,
            method: "POST",
            data: { users: phoneNumbers },
        })

        return response.data.users as IUser[]
    }

    return { searchUser }
}

export default useUser