import * as SecureStore from 'expo-secure-store';

interface useStorageReturnType<T> {
    storeSession: (data: T) => Promise<void>;
    retriveSession: () => Promise<T | null>;
    removeSession: () => Promise<void>;
}

export const useStorage = <T>(session_name: string): useStorageReturnType<T> => {

    const storeSession = async (data: T): Promise<void> => {
        try {
            await SecureStore.setItemAsync(
                session_name,
                JSON.stringify(data)
            );
        } catch (error) {
            throw new Error(error)
        }
    };
    const retriveSession = async (): Promise<T | null> => {
        try {
            const session = await SecureStore.getItemAsync(session_name);
            if (session !== undefined) {
                try {
                    return JSON.parse(session) as T;
                } catch (error) {
                    console.error("Invalid JSON data:", session);
                    return null;
                }
            }

            return null;
        } catch (error) {
            throw new Error(error)
        }
    };
    const removeSession = async (): Promise<void> => {
        try {
            await SecureStore.deleteItemAsync(session_name);
        } catch (error) {
            throw new Error(error)
        }
    };
    return { removeSession, retriveSession, storeSession }
}
