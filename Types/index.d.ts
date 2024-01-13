import { AppwriteException } from "appwrite";

export interface IMessage {
    content: string;
    sender: string;
    reciver:string
    status: string | 'read' | 'sent' | 'received';
    timestamp: string;
  }

export interface IUser {
  userId:string;
  name:string;
  phone:string;
  countrycode: string;
  session?:string;
}