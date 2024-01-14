import React, { useContext, useEffect, useState } from 'react';
import { IUser } from '../Types';
import { ID, Client, Account, Models } from 'appwrite'
import { useStorage } from '../hooks/useStorage';

const APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1";
const APPWRITE_PROJECT_ID = "65a15630009d71dec34f";
const SESSION_NAME = 'AUTH_SESSION'

const client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);
const account = new Account(client);

interface AuthProviderProps {
    children?: React.ReactNode;
}

interface IAuthContext {
    currentUser: IUser | null;
    setActiveCurrentUser: (user: IUser) => void;
    requestOtp: (phone: string) => Promise<string>;
    verifyOtp: (userId: string, otp: string) => Promise<Models.Session>;
    updateName: (name: string) => void;
    logoutUser: () => void;
    createJWT: () => Promise<string>;
}

export const useAuth = () => {
    const state = useContext(AuthContext);

    if (!state) throw new Error('useAuth: State is not defined');

    return state;
};

const AuthContext = React.createContext<IAuthContext | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const { storeSession, retriveSession, removeSession } = useStorage()
    const [currentUser, setCurrentUser] = useState<IUser | null | undefined>();

    const setActiveCurrentUser = (user: IUser) => {
        setCurrentUser(user);
        storeSession<IUser>(SESSION_NAME, user)
    }

    const logoutUser = () => {
        removeSession(SESSION_NAME)
        setCurrentUser(undefined)
    }

    const requestOtp = async (phone: string) => {
        try {
            const sessionToken = await account.createPhoneSession(ID.unique(), '+91' + phone);
            const userId = sessionToken.userId;

            return userId
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const verifyOtp = async (userId: string, otp: string) => {
        try {
            let res = await account.updatePhoneSession(userId, otp);
            return res
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const updateName = async (name: string) => {
        try {
            await account.updateName(name);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const createJWT = async () => {
        const response = await account.createJWT();
        return response.jwt
    }
    useEffect(() => {
        const retriveData = async () => {
            let data = await retriveSession<IUser>(SESSION_NAME)
            setCurrentUser(data)
        }

        retriveData()
    }, [])


    return (
        <AuthContext.Provider value={{ currentUser, createJWT, setActiveCurrentUser, requestOtp, verifyOtp, logoutUser, updateName }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;