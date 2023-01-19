import { Card } from "./Card"
import { User } from "./User"

export interface Collection{
    id: string
    user: User
    cards: Card[]
}