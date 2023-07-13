import { MinimalUser } from './User';

export interface Message {
    content: string;
    timeSent: Date;
    user: MinimalUser;
    chatId: string | null;
}
