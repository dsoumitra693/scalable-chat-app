import axios, { Method } from "axios";

const baseQuery = async <T = any>(method: Method, endpoint: string, data?:{}) => {

    const BASE_URL = "https://4e7a-42-108-145-254.ngrok-free.app"
    try {
        let reqOptions = {
            method,
            url: BASE_URL + endpoint,
            headers: {
              Accept: '*/*',
              'Content-Type': 'application/json'
            },
            data
          };
        let response = await axios.request(reqOptions)
        return response.data as T
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const useRequestOtp = async <T>(phone: string) => baseQuery<T>('GET', `/auth/otp/generate?phone=${phone}`)

export const useVerifyOtp = async <T>(userId: string, otp: string) => baseQuery<T>('POST', '/auth/otp/verify', { userId, otp })