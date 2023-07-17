import { ViewportScroller } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject, takeUntil } from 'rxjs';
import { Card } from '../models/Card';
import { ChildCards } from '../models/ChildCards';
import { CollectionCard } from '../models/CollectionCard';
import { Set } from '../models/set';
import { CardsService } from '../services/cards.service';
import { SetsService } from '../services/sets.service';
import { SortCardsService } from '../services/sort-cards.service';
import { BinderModifyComponent } from './binder-modify/binder-modify.component';
import { StringUtils } from '../shared/util/StringUtils';

@Component({
    selector: 'app-set',
    templateUrl: './set.component.html',
    styleUrls: ['./set.component.css'],
})
export class SetComponent implements OnInit, OnDestroy {
    protected unsubscribe$: Subject<void> = new Subject();

    cards: Card[] = [];
    code: any = '';
    collection: CollectionCard[] = [];
    sets: Set[] = [];
    set!: Set | undefined;
    collectedData!: any | undefined;
    collected: number = 0;
    childSets: Set[] = [];
    childSetCards: ChildCards[] = [];
    codes: string[] = [];
    sortValue!: string;
    wholeSetValue: number = 0;
    responsiveOptions: any[] = [];
    topCards: Card[] = [];
    progressWidth: number = 0;

    constructor(
        private dialog: MatDialog,
        private scroller: ViewportScroller,
        private setsService: SetsService,
        private router: Router,
        private cardsService: CardsService,
        private ngxService: NgxUiLoaderService,
        private cdr: ChangeDetectorRef,
        private SortCardsService: SortCardsService
    ) {
        this.code = this.router.url.split('/').pop();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    ngOnInit(): void {
        this.SortCardsService.onTypeChange$
            .pipe(takeUntil(this.unsubscribe$))
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

        this.getChildSets(this.code);
        this.getSetValue(this.code);
        this.getCollection();
        this.getCards();
        this.getSetData(this.code);
        this.getCollectedCountFromSet(this.code);
        this.progressWidth =
            (this.collectedData?.collected / this.collectedData?.totalCount) *
            100;
    }

    getCards(): void {
        this.ngxService.start();
        this.setsService
            .getSet(this.code)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((cards) => (this.cards = cards));
        this.ngxService.stop();
    }

    getCollection(): void {
        this.cardsService
            .getCollection()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((cards) => (this.collection = cards));
    }

    getSetData(code: string) {
        this.setsService
            .getSetData(code)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((set) => (this.set = set));
    }

    getSetValue(code: string) {
        this.setsService
            .getSetValue(code)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((value) => (this.wholeSetValue = +value.toFixed(2)));
    }

    async getChildSets(code: string): Promise<void> {
        this.setsService
            .getChildSets(code)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((sets) => {
                this.childSets = sets;
            });
        this.setsService
            .getChildSets(code)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((sets) =>
                sets.forEach((set) => {
                    this.codes.push(set.code);
                    this.setsService
                        .getSet(set.code)
                        .pipe(takeUntil(this.unsubscribe$))
                        .subscribe((cards) =>
                            this.childSetCards.push(
                                new ChildCards(set.code, cards)
                            )
                        );
                })
            );
    }

    async getCollectedCountFromSet(code: string) {
        this.cardsService
            .getCollectedCountFromSet(code)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((collected) => (this.collectedData = collected));
        this.cardsService
            .getCollectedCountFromSet(code)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((collected) => (this.collected = collected.collected));
        this.cardsService
            .getCollectedCountFromSet(code)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (collected) =>
                    (this.progressWidth =
                        (collected.collected / collected.totalCount) * 100)
            );
    }

    // Check if card is in collection. For styling the button
    isInCollection(id: string): boolean {
        let isCollected!: boolean;

        for (const element of this.collection) {
            if (element.id == id) {
                if (element.collected == true) {
                    isCollected = true;
                    break;
                } else {
                    isCollected = false;
                    break;
                }
            }
        }

        return isCollected;
    }

    addToCollection(id: string): void {
        // This is needed for updating the view
        for (const element of this.collection) {
            if (element.id == id) {
                element.collected = true;
            }
        }

        this.collected++;

        if (this.set)
            this.progressWidth = (this.collected / this.set?.card_count) * 100;

        // update to db happens here
        this.cardsService.updateCollection([''], [id]);
        this.cdr.detectChanges();
    }

    removeFromCollection(id: string): void {
        // This is needed for updating the view
        for (const element of this.collection) {
            if (element.id == id) {
                element.collected = false;
            }
        }

        this.collected--;

        if (this.set)
            this.progressWidth = (this.collected / this.set?.card_count) * 100;

        // update to db happens here
        this.cardsService.updateCollection([id], ['']);
    }

    moveToSubSet(code: string): void {
        this.router.navigateByUrl('/dashboard/sets/' + this.code + '/' + code);
    }

    handleBinderOpenAction() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '1050px';
        dialogConfig.height = '850px';
        dialogConfig.panelClass = 'binder-dialog';
        dialogConfig.data = { cards: this.cards, collection: this.collection };
        this.dialog.open(BinderModifyComponent, dialogConfig);
    }

    trimName(name: string): string {
        return StringUtils.fetchName(name);
    }
}
