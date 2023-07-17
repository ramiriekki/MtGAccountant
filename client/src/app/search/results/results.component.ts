import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/Card';
import { CollectionCard } from 'src/app/models/CollectionCard';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
    @Input() response: any;
    @Input() cards!: Card[];
    @Input() collection!: CollectionCard[];
    displayedColumns: string[] = [
        'name',
        'set',
        'set_code',
        'set_type',
        'collector_number',
        'rarity',
        'prices',
        'owned',
    ];

    constructor(private router: Router) {}

    ngOnInit(): void {}

    goToCard(string: string): void {
        this.cards.forEach((card) => {
            if (card.name === string) {
                this.router.navigate(['/dashboard/collection/', card.id]);
            }
        });
    }

    isOwned(id: string): boolean {
        let isOwned: boolean = false;

        this.collection.forEach((card) => {
            if (card.name === id && card.collected === true) {
                isOwned = true;
            } else if (card.name === id && card.collected === false) {
                isOwned = false;
            }
        });

        return isOwned;
    }
}
