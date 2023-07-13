import { Card } from './Card';

// Class?
export class ChildCards {
    code: string;
    cards: Card[];

    public constructor(code: string, cards: Card[]) {
        this.code = code;
        this.cards = cards;
    }

    public getCode(): string {
        return this.code;
    }

    public getCards(): Card[] {
        return this.cards;
    }
}
