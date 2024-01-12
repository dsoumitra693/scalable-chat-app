export interface IMessage {
    content: string;
    sender: string;
    reciver:string
    status: string | 'read' | 'sent' | 'received';
    timestamp: string;
  }
  