import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card } from '../models/Card';
import { CollectionCard } from '../models/CollectionCard';

@Injectable({
    providedIn: 'root',
})
export class SortCardsService {
    rarityOrder = ['common', 'uncommon', 'rare', 'mythic'];

    sortType: string = '';
    onTypeChange$: BehaviorSubject<string> = new BehaviorSubject(this.sortType);

    constructor() {}

    sortByNameAZ(cards: Card[]): Card[] {
        return cards.sort((a, b) => (a.name < b.name ? -1 : 1));
    }

    sortByNameZA(cards: Card[]): Card[] {
        return cards.sort((a, b) => (a.name > b.name ? -1 : 1));
    }

    sortByNameAZany(cards: any[]): any[] {
        return cards.sort((a, b) => (a.name < b.name ? -1 : 1));
    }

    sortByNameZAany(cards: any[]): any[] {
        return cards.sort((a, b) => (a.name > b.name ? -1 : 1));
    }

    sortByCollectorNumberAsc(cards: Card[]): Card[] {
        return cards.sort((a, b) =>
            Number(a.collector_number) < Number(b.collector_number) ? -1 : 1
        );
    }

    sortByCollectorNumberDec(cards: Card[]): Card[] {
        return cards.sort((a, b) =>
            Number(a.collector_number) > Number(b.collector_number) ? -1 : 1
        );
    }

    sortByRarityAsc(cards: Card[]): Card[] {
        return cards.sort(
            (a, b) =>
                this.rarityOrder.indexOf(a.rarity) -
                this.rarityOrder.indexOf(b.rarity)
        );
    }

    sortByRarityDec(cards: Card[]): Card[] {
        return cards.sort(
            (a, b) =>
                this.rarityOrder.indexOf(b.rarity) -
                this.rarityOrder.indexOf(a.rarity)
        );
    }

    sortByPriceAsc(cards: Card[]): Card[] {
        return cards.sort((a, b) =>
            Number(a.prices.eur) < Number(b.prices.eur) ? -1 : 1
        );
    }

    sortByPriceDec(cards: Card[]): Card[] {
        return cards.sort((a, b) =>
            Number(a.prices.eur) > Number(b.prices.eur) ? -1 : 1
        );
    }

    sortByCollected(cards: Card[], collection: CollectionCard[]): Card[] {
        cards.forEach((card) => {
            collection.forEach((collectionCard) => {
                if (
                    collectionCard.id === card.id &&
                    collectionCard.collected === true
                ) {
                    card.collected = true;
                }
            });
        });

        return cards.sort((a, b) => Number(b.collected) - Number(a.collected));
    }

    sortByNotCollected(cards: Card[], collection: CollectionCard[]): Card[] {
        cards.forEach((card) => {
            collection.forEach((collectionCard) => {
                if (
                    collectionCard.id === card.id &&
                    collectionCard.collected === true
                ) {
                    card.collected = true;
                }
            });
        });

        return cards.sort((a, b) => Number(a.collected) - Number(b.collected));
    }

    setSortValue(value: string): void {
        this.sortType = value;
        this.onTypeChange$.next(this.sortType);
    }

    getSortValue(): string {
        return this.sortType;
    }
}
