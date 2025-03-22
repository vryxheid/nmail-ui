export interface Draft {
  id: number;
  subject: string;
  body: string | null;
  senderId: number;
  recipientId: number | null;
  date: Date;
}
