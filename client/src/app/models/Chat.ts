import { Message } from './Message';
import { User } from './User';

export interface Chat {
    _id?: string;
    title: string;
    participants: User[];
    messages?: Message[];
    isPrivate: boolean;
    owner: User;
}

export interface ChatForm {
    id?: string;
    title: string;
    participants: string[];
    messages?: string[];
    isPrivate: boolean;
}
