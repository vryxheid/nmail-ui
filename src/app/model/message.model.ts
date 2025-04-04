export interface Draft {
  id: number;
  subject: string;
  body: string | null;
  senderId: number;
  recipientIds: number[];
  date: Date;
}

export interface MessageWithEmails {
  id: number;
  subject: string;
  body: string | null;
  senderEmail: string;
  recipientEmail: string;
  date: Date;
  read: boolean;
  isTrash: boolean;
}

export interface SendMessageRequest {
  subject: string;
  body: string | null;
  senderId: number;
  recipientEmail: string;
}
