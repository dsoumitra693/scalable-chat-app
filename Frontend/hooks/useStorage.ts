import React from 'react'
import * as SecureStore from 'expo-secure-store';

interface useStorageReturnType {
    storeSession: <T>(session_name: string, data: T) => void;
    retriveSession: <T>(session_name: string) => Promise<T>;
    removeSession: (session_name: string) => void;
}

export const useStorage = (): useStorageReturnType => {

    const storeSession = async <T>(session_name: string, data: T) => {
        try {
            await SecureStore.setItemAsync(
                session_name,
                JSON.stringify(data)
            );
        } catch (error) {
            throw new Error(error)
        }
    };
    const retriveSession = async <T>(session_name: string): Promise<T | null> => {
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
    const removeSession = async (session_name: string) => {
        try {
            await SecureStore.deleteItemAsync(session_name, );
        } catch (error) {
            throw new Error(error)
        }
    };
    return { removeSession, retriveSession, storeSession }
}
