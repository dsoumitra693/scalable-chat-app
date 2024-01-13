import React, { useContext, useState } from 'react';
import { IUser } from '../Types';

interface AuthProviderProps {
    children: React.ReactNode;
}

interface IAuthContext {
    currentUser:IUser;
    loginUser:(user:IUser)=>void;
}
export const useAuth = ()=>{
    const state = useContext(AuthContext)

    if (!state) throw new Error('useAuth: State is not define')

    return state
}

const AuthContext = React.createContext<IAuthContext | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    
    const [user, setuser] = useState<IUser| null>()
    
    const loginUser = (_user)=> setuser(_user)

    return (
        <AuthContext.Provider value={{currentUser: user, loginUser}}>{children}</AuthContext.Provider>
    )
};

export default AuthProvider;
