import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Card } from '../models/Card';
import { CollectionCard } from '../models/CollectionCard';
import { CardsService } from '../services/cards.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SortCardsService } from '../services/sort-cards.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit, OnDestroy {
    protected _unsubscribe$: Subject<void> = new Subject();

    lowValue: number = 0;
    highValue: number = 20;

    cards: Card[] = [];
    collection: CollectionCard[] = [];

    currentPage: number = 0;

    sortValue!: string;

    constructor(
        private ngxService: NgxUiLoaderService,
        private router: Router,
        private cardsService: CardsService,
        private SortCardsService: SortCardsService
    ) {}

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }

    ngOnInit(): void {
        this.SortCardsService.onTypeChange$
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((value) => {
                this.sortValue = value;
                if (this.sortValue == 'nameAZ') {
                    this.SortCardsService.sortByNameAZ(this.cards);
                } else if (this.sortValue == 'nameZA') {
                    this.SortCardsService.sortByNameZA(this.cards);
                } else if (this.sortValue == 'collectorNumberAsc') {
                    this.SortCardsService.sortByCollectorNumberAsc(this.cards);
                } else if (this.sortValue == 'collectorNumberDec') {
                    this.SortCardsService.sortByCollectorNumberDec(this.cards);
                } else if (this.sortValue == 'rarityUp') {
                    this.SortCardsService.sortByRarityAsc(this.cards);
                } else if (this.sortValue == 'rarityDown') {
                    this.SortCardsService.sortByRarityDec(this.cards);
                } else if (this.sortValue == 'priceAsc') {
                    this.SortCardsService.sortByPriceAsc(this.cards);
                } else if (this.sortValue == 'priceDec') {
                    this.SortCardsService.sortByPriceDec(this.cards);
                } else if (this.sortValue == 'collected') {
                    this.SortCardsService.sortByCollected(
                        this.cards,
                        this.collection
                    );
                } else if (this.sortValue == 'notCollected') {
                    this.SortCardsService.sortByNotCollected(
                        this.cards,
                        this.collection
                    );
                }
            });

        this.getCollection();
        this.getAllCards();
    }

    getAllCards(): void {
        this.ngxService.start();
        this.cardsService
            .getAllCards()
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((cards) => {
                this.cards = cards;
                this.ngxService.stop();
            });
    }

    getCollection(): void {
        this.cardsService
            .getCollection()
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((cards) => (this.collection = cards));
    }

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

    // used to build a slice of papers relevant at any given time
    public getPaginatorData(event: PageEvent): PageEvent {
        this.router.navigate([`dashboard/collection/page/${event.pageIndex}`]);
        this.currentPage = event.pageIndex;

        this.lowValue = event.pageIndex * event.pageSize;
        this.highValue = this.lowValue + event.pageSize;
        return event;
    }
}
