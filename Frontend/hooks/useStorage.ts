import * as SecureStore from 'expo-secure-store';

interface useStorageReturnType<T> {
    storeSession: (data: T) => void;
    retriveSession: () => Promise<T>;
    removeSession: () => void;
}

export const useStorage = <T>(session_name: string): useStorageReturnType<T> => {

    const storeSession = async <T>(data: T) => {
        try {
            await SecureStore.setItemAsync(
                session_name,
                JSON.stringify(data)
            );
        } catch (error) {
            throw new Error(error)
        }
    };
    const retriveSession = async <T>(): Promise<T | null> => {
        try {
            const session = await SecureStore.getItemAsync(session_name);

            if (session !== undefined) {
                return JSON.parse(session) as T
            }

            return undefined;
        } catch (error) {
            throw new Error(error)
        }
    };
    const removeSession = async () => {
        try {
            await SecureStore.deleteItemAsync(session_name);
        } catch (error) {
            throw new Error(error)
        }
    };
    return { removeSession, retriveSession, storeSession }
}
