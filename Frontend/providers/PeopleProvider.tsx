import React, { createContext, useContext } from "react";
import { useStorage } from "../hooks/useStorage";
import { IMessage, IPeople } from "../Types";
import useUser from "../hooks/useUser";
import { defaultAvatarImg } from "../constants";

const SESSION_NAME = 'PEOPLE_SESSION';

interface PeopleProviderProps {
    children?: React.ReactNode;
}

interface IPeopleContext {
    getPeople: () => Promise<IPeople[]>;
    storeMsg: (msg: IMessage) => Promise<void>;
}

const PeopleContext = createContext<IPeopleContext | null>(null);

const PeopleProvider: React.FC<PeopleProviderProps> = ({ children }) => {
    const { storeSession, retriveSession } = useStorage<Map<string, IPeople | undefined>>(SESSION_NAME);
    const { searchUser } = useUser()
    const getPeople = async (): Promise<IPeople[]> => {
        const peopleMap = await retriveSession();

        if (!peopleMap) {
            return [];
        }

        const peoples = Array.from(peopleMap.values());
        return peoples;
    };

    const storeMsg = async (msg: IMessage): Promise<void> => {
        let prevPeopleMap = await retriveSession();
        const sender = msg.sender;

        if (!prevPeopleMap) {
            prevPeopleMap = new Map<string, IPeople>();
        }

        const people = prevPeopleMap.get(sender);
        let newPeople: IPeople
        if (!!people) {
            newPeople = {
                ...people,
                lastmsg: {
                    content: msg.content,
                    timeStamp: msg.timestamp
                },
                msges: [...people.msges, msg],
                unreadMsgCount: ++people.unreadMsgCount
            }
        } else {
            let users = await searchUser([msg.reciver])
            newPeople = {
                name: users[0].name,
                phone: users[0].phone,
                avatar: defaultAvatarImg,
                unreadMsgCount: 1,
                lastmsg: {
                    content: msg.content,
                    timeStamp: msg.timestamp
                },
                msges: [msg]
            }
        }

        prevPeopleMap.set(sender, newPeople);
        console.log(prevPeopleMap)

        storeSession(prevPeopleMap);
    };

    const value: IPeopleContext = {
        getPeople,
        storeMsg,
    };

    return (
        <PeopleContext.Provider value={value}>
            {children}
        </PeopleContext.Provider>
    );
};

export const usePeoples = (): IPeopleContext => {
    const context = useContext(PeopleContext);
    if (!context) {
        throw new Error("usePeopleContext must be used within a PeopleProvider");
    }
    return context;
};

export default PeopleProvider
