import { AppwriteException } from "appwrite";

export interface IMessage {
  content: string;
  sender: string;
  reciver: string
  status: string | 'read' | 'sent' | 'received';
  timestamp: string;
}

export interface IUser {
  userId: string;
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
  avatarImg?:string
}
