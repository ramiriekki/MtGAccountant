import { User } from "./User";

export interface Chat{
    _id?: string;
    title: string;
    participants: User[]
    messages?: string[]
    isPrivate: boolean;
}

export interface ChatForm{
  id?: string;
  title: string;
  participants: string[]
  messages?: string[]
  isPrivate: boolean;
}
