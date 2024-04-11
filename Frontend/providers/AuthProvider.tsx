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
    // Custom hook to access the authentication context
    // Returns the authentication context state or a default state if AuthContext is not provided
    try {
        const state = useContext(AuthContext);

        if (!state) {
            // Return default state here
            return { currentUser: null, setActiveCurrentUser: () => {}, requestOtp: () => Promise.resolve(''), verifyOtp: () => Promise.resolve({}), updateName: () => {}, logoutUser: () => {}, createJWT: () => Promise.resolve('') };
        }

        return state;
    } catch (error) {
        console.error(error);
        // handle the error gracefully, e.g. show an error message to the user or redirect to an error page
    }
};


const AuthContext = React.createContext<IAuthContext | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const { storeSession, retriveSession, removeSession } = useStorage<IUser>(SESSION_NAME)
    const [currentUser, setCurrentUser] = useState<IUser | null | undefined>();
    const setActiveCurrentUser = (user: IUser) => {
        setCurrentUser(user);
    }
    
    useEffect(() => {
        storeSession(currentUser);
    }, [currentUser])
    
    const requestOtp = async (phone: string) => {
        try {
            const sessionToken = await account.createPhoneSession(ID.unique(), '+91' + phone);
            const userId = sessionToken?.userId;
    
            return userId
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    
    const createJWT = async () => {
        const response = await account.createJWT();
        if (response && response.jwt) {
            return response.jwt;
        } else {
            throw new Error('JWT not found in response');
        }
    }
    
    const verifyOtp = async (userId: string, otp: string) => {
        try {
            let res = await account.updatePhoneSession(userId, otp);
            if (typeof res !== 'object') {
                throw new Error('Unexpected response');
            }
            return res;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const logoutUser = () => {
        removeSession()
        setCurrentUser(undefined)
    }


    const updateName = async (name: string) => {
        try {
            await account.updateName(name);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    useEffect(() => {
        const retriveData = async () => {
            let data = await retriveSession()
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