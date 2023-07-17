import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/Card';
import { CollectionCard } from 'src/app/models/CollectionCard';
import { CardsService } from 'src/app/services/cards.service';

@Component({
    selector: 'app-single-card',
    templateUrl: './single-card.component.html',
    styleUrls: ['./single-card.component.css'],
})
export class SingleCardComponent implements OnInit {
    @Input() card!: Card;
    @Input() collection!: CollectionCard[];

    constructor(private cardsService: CardsService) {}

    ngOnInit(): void {}

    // Check if card is in collection. For styling the button
    isInCollection(id: string): boolean {
        const card = this.collection.find((element) => element.id === id);
        return card ? card.collected : false;
    }

    addToCollection(id: string): void {
        const card = this.collection.find((element) => element.id === id);
        if (card) {
            card.collected = true;
        }
        this.cardsService.updateCollection([''], [id]);
    }

    removeFromCollection(id: string): void {
        const card = this.collection.find((element) => element.id === id);
        if (card) {
            card.collected = false;
        }
        this.cardsService.updateCollection([id], ['']);
    }
}
