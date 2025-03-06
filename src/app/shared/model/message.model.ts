export class Message {
  id!: number;
  subject!: string;
  body!: string | null;
  senderId!: number;
  recipientId!: number;
  date!: Date;
  read!: boolean;
  isTrash!: boolean;
}
