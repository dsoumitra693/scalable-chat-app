import React, { useCallback, useContext, useEffect, useState } from 'react';
import { IMessage } from '../Types';
import { io, Socket } from 'socket.io-client';
import { serverUrl } from '../constants';
import { useAuth } from './AuthProvider';
import { usePeoples } from './PeopleProvider';

const SERVER_URL = serverUrl

interface SocketProviderProps {
    children?: React.ReactNode;
}

interface ISocketContext {
    sendMessage: (msg: IMessage) => any;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

/**
 * Custom hook that allows components to access the socket connection and send messages.
 * @returns {Object} The state object containing the sendMessage function.
 * @throws {Error} If the state is not defined.
 */
export const useSocket = () => {
  const state = useContext(SocketContext);

  if (!state) {
    throw new Error('useSocket: State is not defined');
  }

  return state;
};

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {

    const [socket, setSocket] = useState<Socket>()
    const { currentUser } = useAuth()
    let { storeMsg } = usePeoples()

    const sendMessage: ISocketContext['sendMessage'] = useCallback(
        (msg: IMessage) => {
            console.log('Send Message ', msg.content);
            storeMsg(msg)
            if (socket) {
                socket.emit('private:message', msg)
            } else {
                console.warn('Socket is undefined or null');
            }
        },
        [socket, storeMsg]);

    const handleSocketError = (error: any) => {
        console.error('Socket connection error:', error);
        // Display error to the user
    };

    useEffect(() => {
        if (!currentUser || !currentUser.jwt) return
        let _socket: Socket;
        try {
            console.log('Try to connect socket')
            _socket = io(SERVER_URL, {
                query: {
                    token: currentUser.jwt
                },
                reconnection: true,
            });

            _socket.on('connect', () => {
                console.log('Connected to socket server');
            });

            _socket.on('error', handleSocketError);

            _socket.on('private:message', (msg) => {
                storeMsg(msg)
            });
            _socket.on('offline:message', (msg) => {
                storeMsg(msg)
            });

            setSocket(_socket)

        } catch (error) {
            console.error('Error creating socket connection:', error);
            // Handle error as needed
        }

        return () => {
            if (_socket) {
                _socket.disconnect();
            }
        };
    }, [currentUser?.jwt, storeMsg]);

    return <SocketContext.Provider value={{ sendMessage }}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
