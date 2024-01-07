export interface IMessage {
    content: string;
    user: string;
    status: string | 'read' | 'sent' | 'received';
    timestamp: string;
  }
  