import { AppwriteException } from "appwrite";

type MsgStatus = 'read' | 'sent' | 'received';

export interface IMessage {
  content: string;
  sender: string;
  reciver: string
  status: MsgStatus
  timestamp: Date;
}

export interface IUser {
  id: string;
  name: string;
  phone: string;
  countrycode?: string;
  jwt?: string;
}

export interface IMenuItem {
  title: string;
  iconName: string;
  callback: (p?: any) => any
}

export interface IContacts {
  id: string;
  name: string,
  phoneNumber: string,
  isOnFastChat: boolean,
  avatarImg?: string
}


export interface IPeople {
  name: string;
  phone: string;
  avatar:string;
  msges: IMessage[]
  lastmsg: {
    content: string;
    timeStamp: Date;
  };
  unreadMsgCount: number;
}