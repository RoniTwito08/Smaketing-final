import { User } from '../../types/user';

export type ChatUser = User;

export interface ChatMessage {
  _id?: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string | Date;
  read: boolean;
}  