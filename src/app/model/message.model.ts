export interface Message {
  id: number;
  subject: string;
  body: string | null;
  senderId: number;
  recipientId: number;
  date: Date;
  read: boolean;
  isTrash: boolean;
}

export interface Draft {
  id: number;
  subject: string;
  body: string | null;
  senderId: number;
  recipientIds: number[];
  date: Date;
}
