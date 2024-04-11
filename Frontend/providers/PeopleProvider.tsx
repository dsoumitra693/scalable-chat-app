import React, { createContext, useContext } from "react";
import { useStorage } from "../hooks/useStorage";
import { IMessage, IPeople } from "../Types";
import { defaultAvatarImg } from "../constants";
import useContacts from "../hooks/useContacts";

const SESSION_NAME = 'PEOPLE_SESSION';

interface PeopleProviderProps {
    children?: React.ReactNode;
}

interface IPeopleContext {
    getPeoples: () => Promise<IPeople[]>;
    storeMsg: (msg: IMessage) => Promise<void>;
}

class PeopleProviderError extends Error {
    stack: string | undefined;

    constructor(message: string = 'An error occurred in the PeopleProvider context') {
        super(message);
        this.name = 'PeopleProviderContextError';
        this.stack = new Error().stack;
    }

    toString(): string {
        return `${this.name}: ${this.message}`;
    }
}

const PeopleContext = createContext<IPeopleContext | null>(null);

const PeopleProvider: React.FC<PeopleProviderProps> = ({ children }) => {
    const { storeSession, retriveSession, removeSession } = useStorage<IPeople[] | undefined>(SESSION_NAME);
    const { getLocalContacts } = useContacts()
    const getPeoples = async (): Promise<IPeople[]> => {
        const peopleMap = await retriveSession();
        if (!peopleMap) {
            return [];
        }

        const clonedPeopleMap = {...peopleMap};
        const peoples = clonedPeopleMap;
        return peoples;
    };

    const storeMsg = async (msg: IMessage): Promise<void> => {
        let prevPeoples = await retriveSession()
        let reciver = msg.reciver
        let data: IPeople[]

        let people = prevPeoples?.find(people => people.phone === reciver)

        if (prevPeoples !== undefined && people !== undefined) {
            data = prevPeoples.map(people => {
                if (people.phone === reciver) {
                    return {
                        ...people,
                        msges: [...people.msges, msg],
                        lastmsg: {
                            content: msg.content,
                            timeStamp: msg.timestamp,
                        },
                    };
                }
                return people;
            });
        } else if (prevPeoples !== undefined) {
            let localcontact = (await getLocalContacts())?.find(
                contact => !!contact?.phoneNumbers?.find(phone => phone.number === reciver)
            )
            data = [
                ...prevPeoples,
                {
                    name: localcontact.name || msg.reciver,
                    phone: msg.reciver,
                    avatar: localcontact.image.uri || defaultAvatarImg,
                    msges: [msg],
                    lastmsg: {
                        content: msg.content,
                        timeStamp: msg.timestamp,
                    },
                    unreadMsgCount: 0,
                }]
        } else {
            let localcontact = (await getLocalContacts())?.find(
                contact => !!contact?.phoneNumbers?.find(phone => phone.number === reciver)
            )
            data = [
                {
                    name: localcontact.name || msg.reciver,
                    phone: msg.reciver,
                    avatar: localcontact.image.uri || defaultAvatarImg,
                    msges: [msg],
                    lastmsg: {
                        content: msg.content,
                        timeStamp: msg.timestamp,
                    },
                    unreadMsgCount: 0,
                }]
        }
        storeSession(data)
    };

    const value: IPeopleContext = {
        getPeoples,
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
        throw new PeopleProviderError("usePeopleContext must be used within a PeopleProvider");
    }
    return context;
};

export default PeopleProvider