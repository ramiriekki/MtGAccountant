import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/Card';
import { Set } from 'src/app/models/set';
import { CollectionCard } from 'src/app/models/CollectionCard';
import { CardsService } from 'src/app/services/cards.service';

@Component({
    selector: 'app-set-data',
    templateUrl: './set-data.component.html',
    styleUrls: ['./set-data.component.css'],
})
export class SetDataComponent implements OnInit {
    @Input() wholeSetValue: any;
    @Input() cards!: Card[];
    @Input() collection!: CollectionCard[];
    @Input() set!: Set | undefined;
    @Input() collected!: number;
    progressWidth: number = 0;

    constructor(
        private cardsService: CardsService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {}

    addAllToCollection(): void {
        let ids: string[] = [];

        this.cards.forEach((card) => {
            ids.push(card.id);
        });

        for (const element of this.collection) {
            ids.forEach((id) => {
                if (element.id == id) {
                    element.collected = true;
                }
            });
        }

        this.progressWidth = 100;

        // update to db happens here
        this.cardsService.updateCollection([''], ids);
        this.cdr.detectChanges();
    }

    removeAllFromCollection(): void {
        let ids: string[] = [];

        this.cards.forEach((card) => {
            ids.push(card.id);
        });

        for (const element of this.collection) {
            ids.forEach((id) => {
                if (element.id == id) {
                    element.collected = false;
                }
            });
        }

        this.progressWidth = 0;

        // update to db happens here
        this.cardsService.updateCollection(ids, ['']);
        this.cdr.detectChanges();
    }
}
